import { z } from "zod";

export const seatCreateSchema = z.object({
  body: z.object({
    order: z.number(),
    carriageId: z.number(),
  }),
});

export const seatIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const seatUpdateSchema = z.object({
  body: z
    .object({
      order: z.number(),
      carriageId: z.number(),
    })
    .partial(),
});

export type seatCreateInput = z.infer<typeof seatCreateSchema>["body"];
export type seatIdParamInput = z.infer<typeof seatIdParamInputSchema>["params"];
export type seatUpdateInput = z.infer<typeof seatUpdateSchema>["body"];
