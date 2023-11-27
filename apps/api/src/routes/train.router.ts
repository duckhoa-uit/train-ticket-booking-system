import { Router } from "express";

import {
  createTrainHandler,
  getTrainHandler,
  getTrainById,
  updateTrainHandler,
  deleteTrainHandler,
} from "@/controllers/train.controller";
import { validate } from "@/middleware";
import { trainCreateSchema, trainUpdateSchema } from "@/schemas/train.schema";

export const trainRouter = Router();

trainRouter.post("/", validate(trainCreateSchema), createTrainHandler);
trainRouter.get("/", getTrainHandler);
trainRouter.get("/:id", getTrainById);
trainRouter.put("/:id", validate(trainUpdateSchema), updateTrainHandler);
trainRouter.delete("/:id", deleteTrainHandler);
