import { Router } from "express";

import { webhookPaymentHandler } from "@/controllers/webhook.controller";
import { validate } from "@/middleware";
import { webhookPaymentSchema } from "@/schemas/webhook.schema";

export const webhookRouter = Router();

webhookRouter.post("/payment", validate(webhookPaymentSchema), webhookPaymentHandler);
