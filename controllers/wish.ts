import Wish from "../models/wish";
import { req, res } from "../types/expressTypes";

const getWishs = (req: req, res: res): void => {
  // #swagger.description = 'Get Wishes for User'
  /* #swagger.responses[200] = {
     description: 'Whishes',
     schema: { list: {$ref: '#/definitions/Wishes'}  }
 } */
  /* #swagger.responses[401] = {
     description: 'If not login',
     schema: { message: "Auth error" }
 } */

  if (req.user)
    Wish.find({ creator: req.user._id })
      .sort({ dateCreate: -1 })
      .limit(30)
      .lean()
      .then((result) => {
        if (result.length) {
          res.status(200).send({ list: result }).end();
        } else {
          res.status(400).send({ message: "No content" }).end();
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "DB Error" }).end();
        console.error(`err`, err);
      });
  else res.status(401).send({ message: "Auth error" }).end();
};

const getWishById = (req: req, res: res): void => {
  // #swagger.description = 'Get Wish by ID'
  /* #swagger.parameters['id'] = {
   description: 'Existing wish ID',
   type: 'string',
   required: true
 } */
  /* #swagger.responses[200] = {
     description: 'Get Wish by ID',
     schema: {$ref: '#/definitions/Wish'} 
 } */
  /* #swagger.responses[400] = {
     description: 'Not found',
     schema: { message: "No content" }
 } */

  Wish.find({ _id: req.query._id })
    .lean()
    .then((result) => {
      if (result) {
        res.status(200).send(result).end();
      } else {
        res.status(400).send({ message: "No content" }).end();
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "DB Error" }).end();
      console.error(`err`, err);
    });
};

const createWish = (req: req, res: res): void => {
  // #swagger.description = 'Create wish'
  // тело запроса
  /* #swagger.parameters = {
   in: 'body',
   description: 'Wish data',
   type: 'object',
   required: true,
   schema: { $ref: '#/definitions/Wish' }
 } */
  /* #swagger.responses[200] = {
     description: 'New Wish data',
     schema: { $ref: '#/definitions/Wish' }
 } */

  if (req.user)
    Wish.create({ ...req.body, creator: req.user._id })
      .then((result) => {
        if (result.length) {
          res.status(200).send({ list: result }).end();
        } else {
          res.status(400).send({ message: "No content" }).end();
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "DB Error" }).end();
        console.error(`err`, err);
      });
  else res.status(401).send({ message: "Auth error" }).end();
};

export { getWishs, createWish, getWishById };
