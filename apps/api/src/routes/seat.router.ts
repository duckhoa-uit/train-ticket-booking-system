import { Router } from "express";

import {
  createSeatHandler,
  getSeatHandler,
  getSeatByIdHandler,
  updateSeatHandler,
  deleteSeatHandler,
} from "@/controllers/seat.controller";
import { validate } from "@/middleware";
import { seatCreateSchema, seatUpdateSchema } from "@/schemas/seat.schema";

export const seatRouter = Router();

seatRouter.post("/", validate(seatCreateSchema), createSeatHandler);
seatRouter.get("/", getSeatHandler);
seatRouter.get("/:id", getSeatByIdHandler);
seatRouter.put("/:id", validate(seatUpdateSchema), updateSeatHandler);
seatRouter.delete("/:id", deleteSeatHandler);
