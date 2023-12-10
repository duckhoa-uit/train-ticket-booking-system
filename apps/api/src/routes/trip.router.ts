import { Router } from "express";

import {
  createTripHandler,
  getTripHandler,
  getTripById,
  updateTripHandler,
} from "@/controllers/trip.controller";
import { validate } from "@/middleware";
import { tripCreateSchema, tripUpdateSchema } from "@/schemas/trip.schema";

export const tripRouter = Router();

tripRouter.post("/", validate(tripCreateSchema), createTripHandler);
tripRouter.get("/", getTripHandler);
tripRouter.get("/:id", getTripById);
tripRouter.put("/:id", validate(tripUpdateSchema), updateTripHandler);
