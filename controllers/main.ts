import Wish from "../models/wish";
import { Request, Response, NextFunction } from "express";
import Event from "../models/event";
import { req, res } from "../types/expressTypes";

const getMainScreen = (req: req, res: res): void => {
  // #swagger.description = 'Feed (main screen)'
  /* #swagger.responses[200] = {
     description: 'Event (if login) and Whishes',
     schema: { upcomingEvents: {$ref: '#/definitions/Events', required:false}, list:{ $ref: '#/definitions/Wishes', required:true }, "required": ["list"]  }
 } */

  const dbQueryData: { openAll: boolean; region?: string | any } = {
    openAll: true,
  };
  if (req.query.region) {
    dbQueryData.region = req.query.region;
  }
  const dbQuery: object[] = [
    Wish.find(dbQueryData).sort({ dateCreate: -1 }).limit(30).lean(),
  ];
  if (req.user)
    dbQuery.push(
      Event.find({
        $or: [{ guests: { $in: req.user._id } }, { creator: req.user._id }],
      })
        .sort({ date: -1 })
        .lean()
    );
  Promise.all(dbQuery)
    .then((result: [][]) => {
      if (result[0].length) {
        const data: { upcomingEvents?: []; list: [] } = { list: result[0] };
        if (result[1].length) {
          data.upcomingEvents = result[1];
        }
        res.status(200).send(data).end();
      } else {
        res.status(400).send({ message: "No content" }).end();
      }
    })
    .catch((err) => {
      console.error(`err`, err);
      res.status(500).send({ message: "DB Error" }).end();
    });
};

export { getMainScreen };
