import { NextFunction, Request, Response } from "express";

import {
  WebhookPaymentInput,
  webhookPaymentSchema,
} from "@/schemas/webhook.schema";
import { confirmPayment } from "@/services/webhook.service";

export const webhookPaymentHandler = async (
  req: Request<{}, {}, WebhookPaymentInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body: reqBody } = webhookPaymentSchema.parse(req);

    const transaction = reqBody.payment;
    console.log(`Received transaction: ${JSON.stringify(transaction)}`);

    await confirmPayment(transaction);
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return next(error);
  }
};
