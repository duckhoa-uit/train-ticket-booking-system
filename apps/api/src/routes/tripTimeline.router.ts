import { Router } from "express";

import {
  createTripTimelineHandler,
  getTripTimelineHandler,
  getTripTimelineById,
  updateTripTimelineHandler,
} from "@/controllers/tripTimeline.controller";
import { validate } from "@/middleware";
import { tripTimelineCreateSchema, tripTimelineUpdateSchema } from "@/schemas/tripTimeline.schema";

export const tripTimelineRouter = Router();

tripTimelineRouter.post("/", validate(tripTimelineCreateSchema), createTripTimelineHandler);
tripTimelineRouter.get("/", getTripTimelineHandler);
tripTimelineRouter.get("/:id", getTripTimelineById);
tripTimelineRouter.put("/:id", validate(tripTimelineUpdateSchema), updateTripTimelineHandler);
