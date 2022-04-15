import { Request, Response, NextFunction } from "express";

type req = Request & {
  user:
    | {
        _id: any;
        email: string;
      }
    | undefined;
};
type res = Response;

export { req, res };
