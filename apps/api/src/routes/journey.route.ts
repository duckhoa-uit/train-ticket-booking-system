import { Router } from "express";

import {
  createJourneyHandler,
  updateJourneyHandler,
  getJourneysHandler,
} from "@/controllers/journey.controller";
import { validate } from "@/middleware";
import { journeyCreateSchema, journeyUpdateSchema } from "@/schemas/journey.schema";

export const journeyRouter = Router();

journeyRouter.post("/", validate(journeyCreateSchema), createJourneyHandler);

journeyRouter.patch("/", validate(journeyUpdateSchema), updateJourneyHandler);

journeyRouter.get("/", getJourneysHandler);
