import { z } from "zod";

export const orderCheckoutQuerySchema = z.object({
  orderId: z.coerce.number().optional(),
});
