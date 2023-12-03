import { Router } from "express";

import {
  createCarriageHandler,
  getCarriageHandler,
  getCarriageById,
  updateCarriageHandler,
  deleteCarriageHandler,
} from "@/controllers/carriages.controller";
import { validate } from "@/middleware";
import { carriageCreateSchema, carriageUpdateSchema } from "@/schemas/carriages.schema";

export const carriageRouter = Router();

carriageRouter.post("/", validate(carriageCreateSchema), createCarriageHandler);
carriageRouter.get("/", getCarriageHandler);
carriageRouter.get("/:id", getCarriageById);
carriageRouter.put("/:id", validate(carriageUpdateSchema), updateCarriageHandler);
carriageRouter.delete("/:id", deleteCarriageHandler);
