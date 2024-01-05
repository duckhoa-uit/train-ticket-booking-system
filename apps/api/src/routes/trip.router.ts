import { Router } from "express";

import {
  createTripHandler,
  getPriceOnTripHandler,
  getSeatsOnTripHandler,
  getTripById,
  getTripsHandler,
  updateTripHandler,
} from "@/controllers/trip.controller";
import { validate } from "@/middleware";
import {
  getPriceOnTripQueryInputSchema,
  tripCreateSchema,
  tripUpdateSchema,
} from "@/schemas/trip.schema";

export const tripRouter = Router();

tripRouter.post("/", validate(tripCreateSchema), createTripHandler);
tripRouter.get("/", getTripsHandler);
tripRouter.get("/:id", getTripById);
tripRouter.get(
  "/:id/prices",
  validate(getPriceOnTripQueryInputSchema),
  getPriceOnTripHandler,
);
tripRouter.get("/:id/seats", getSeatsOnTripHandler);
tripRouter.put("/:id", validate(tripUpdateSchema), updateTripHandler);
