import { Router } from "express";

import { getTripsHandler } from "@/controllers/trip.controller";
import { validate } from "@/middleware";
import { searchTripQueryInputSchema } from "@/schemas/trip.schema";

export const searchRouter = Router();

searchRouter.get("/", validate(searchTripQueryInputSchema), getTripsHandler);
