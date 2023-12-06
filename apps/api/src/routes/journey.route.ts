import { Router } from "express";

import {
  createJourneyHandler,
  updateJourneyHandler,
  getJourneysHandler,
  getJourneyByIdHandler,
} from "@/controllers/journey.controller";
import { validate } from "@/middleware";
import { journeyCreateSchema, journeyUpdateSchema } from "@/schemas/journey.schema";

export const journeyRouter = Router();

journeyRouter.post("/", validate(journeyCreateSchema), createJourneyHandler);

journeyRouter.patch("/:id", validate(journeyUpdateSchema), updateJourneyHandler);

journeyRouter.get("/:id", getJourneyByIdHandler);

journeyRouter.get("/", getJourneysHandler);
