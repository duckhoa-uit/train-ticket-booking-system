import { z } from "zod";

export const webhookPaymentSchema = z.object({
  body: z.object({
    token: z.string(),
    payment: z.object({
      transaction_id: z.string(),
      amount: z.number(),
      content: z.string(),
      date: z.coerce.date(),
      account_receiver: z.string(),
      gate: z.enum(["MBBANK", "ACBBANK"]),
    }),
  }),
});

export type WebhookPaymentInput = z.infer<typeof webhookPaymentSchema>["body"];
