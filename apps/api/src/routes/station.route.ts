import { Router } from "express";

import {
  createStationHandler,
  getStationsHandler,
  updateStationHandler,
} from "@/controllers/station.controller";
import { validate } from "@/middleware";
import { stationCreateSchema, stationUpdateSchema } from "@/schemas/station.schema";

export const stationRouter = Router();

stationRouter.post("/", validate(stationCreateSchema), createStationHandler);

stationRouter.patch("/", validate(stationUpdateSchema), updateStationHandler);

stationRouter.get("/", getStationsHandler);
