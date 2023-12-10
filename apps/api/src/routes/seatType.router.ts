import { Router } from "express";

import {
  createSeatTypeHandler,
  getSeatTypeHandler,
  getSeatTypeById,
} from "@/controllers/seatType.controller";
import { validate } from "@/middleware";
import { seatTypeCreateSchema } from "@/schemas/seatType.schema";

export const seatTypeRouter = Router();

seatTypeRouter.post("/", validate(seatTypeCreateSchema), createSeatTypeHandler);
seatTypeRouter.get("/", getSeatTypeHandler);
seatTypeRouter.get("/:id", getSeatTypeById);
