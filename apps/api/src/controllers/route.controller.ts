import { Request, Response } from "express";

import prisma from "@ttbs/prisma";

const routeController = {
  addRoute: async (req: Request, res: Response) => {
    try {
      const { depart_station, arrive_station, depart_time, arrive_time, depart_day } = req.body;
      const newRoute = await prisma.route.create({
        data: {
          depart_station,
          arrive_station,
          depart_time,
          arrive_time,
          depart_day,
        },
      });
      res.status(201).json(newRoute);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default routeController;
