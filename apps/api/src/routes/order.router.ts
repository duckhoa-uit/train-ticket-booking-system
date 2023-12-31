import { Router } from "express";

import {
  createOrderHandler,
  getOrderHandler,
  getOrderById,
  updateOrderHandler,
} from "@/controllers/order.controller";
import { validate } from "@/middleware";
import { orderCreateSchema, orderUpdateSchema } from "@/schemas/order.schema";

export const orderRouter = Router();

orderRouter.post("/", validate(orderCreateSchema), createOrderHandler);
orderRouter.get("/", getOrderHandler);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", validate(orderUpdateSchema), updateOrderHandler);
