import User from "../models/user";
import { Request, Response, NextFunction } from "express";

const login = (req: Request, res: Response): void => {
  // #swagger.description = 'Login'
  // тело запроса
  /* #swagger.parameters = {
   in: 'body',
   description: 'Login data',
   type: 'object',
   required: true,
   schema: { email:{type:'string'}, password:{type:'string'} }
 } */
  /* #swagger.responses[200] = {
     description: 'User info data',
     schema: { $ref: '#/definitions/User' }
 } */

  const { email, password }: { email: string; password: string } = req.body;

  User.findOne({ email, password })
    .lean()
    .then((result) => {
      if (result) {
        res.status(400).send(result).end();
      } else {
        res.status(404).send({ message: "Not Found" }).end();
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "DB Error" }).end();
      console.error(`err`, err);
    });
};

const registration = (req: Request, res: Response): void => {
  // #swagger.description = 'Registration'
  // тело запроса
  /* #swagger.parameters = {
   in: 'body',
   description: 'Reg data',
   type: 'object',
   required: true,
   schema: { $ref: '#/definitions/User' }
 } */
  /* #swagger.responses[200] = {
     description: 'User info data',
     schema: { $ref: '#/definitions/User' }
 } */

  console.log(`req.body`, req.body);

  const {
    name,
    email,
    password,
    phone,
    openAll,
  }: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    openAll?: boolean;
  } = req.body;

  User.create(req.body)
    .then((result) => {
      if (result) {
        res.status(400).send(result).end();
      } else {
        res.status(404).send({ message: "Not Found" }).end();
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "DB Error" }).end();
      console.error(`err`, err);
    });
};

export { login, registration };
