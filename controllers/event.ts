import Event from "../models/event";
import { req, res } from "../types/expressTypes";

const getEvents = (req: req, res: res): void => {
  // #swagger.description = 'Get Events'
  /* #swagger.responses[200] = {
     description: 'Get Events',
     schema: { list: {$ref: '#/definitions/Events'}  }
 } */

  if (req.user)
    Event.find({
      $or: [{ guests: { $in: req.user._id } }, { creator: req.user._id }],
    })
      .sort({ date: -1 })
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

const getEventById = (req: req, res: res): void => {
  // #swagger.description = 'Get Event by ID'
  /* #swagger.parameters['id'] = {
     description: 'Existing Event ID',
     type: 'string',
     required: true
   } */
  /* #swagger.responses[200] = {
       description: 'Get Event by ID',
       schema: {$ref: '#/definitions/Event'} 
   } */
  /* #swagger.responses[400] = {
       description: 'Not found',
       schema: { message: "No content" }
   } */

  Event.find({ _id: req.query._id })
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

const createEvents = (req: req, res: res): void => {
  // #swagger.description = 'Create Events'
  // тело запроса
  /* #swagger.parameters = {
   in: 'body',
   description: 'Event data',
   type: 'object',
   required: true,
   schema: { $ref: '#/definitions/Event' }
 } */
  /* #swagger.responses[200] = {
     description: 'New Event data',
     schema: { $ref: '#/definitions/Event' }
 } */

  if (req.user)
    Event.create({
      ...req.body,
      creator: req.user._id,
    })
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

export { getEvents, createEvents, getEventById };
