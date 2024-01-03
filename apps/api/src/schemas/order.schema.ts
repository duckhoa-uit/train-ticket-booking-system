import { z } from "zod";

export const orderCreateSchema = z.object({
  body: z.object({
    buyerName: z.string(),
    buyerIdentification: z.string(),
    buyerPhone: z.string(),
    buyerEmail: z.string(),
    tickets: z.array(
      z.object({
        seatId: z.number(),
        fromStationId: z.number(),
        toStationId: z.number(),
        amount: z.number(),
        userName: z.string(),
        userIdentification: z.string(),
      })
    ),
  }),
});

export const orderIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const orderUpdateSchema = z.object({
  body: z
    .object({
      buyerName: z.string(),
      buyerIdentification: z.string(),
      buyerPhone: z.string(),
      buyerEmail: z.string(),
      tickets: z.array(
        z.object({
          seatId: z.number(),
          fromStationId: z.number(),
          toStationId: z.number(),
          amount: z.number(),
          userName: z.string(),
          userIdentification: z.string(),
        })
      ),
    })
    .partial(),
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>["body"];
export type OrderIdParamInput = z.infer<typeof orderIdParamInputSchema>["params"];
export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>["body"];
