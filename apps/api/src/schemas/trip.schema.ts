import { z } from "zod";

export const tripCreateSchema = z.object({
  body: z.object({
    name: z.string(),
    journeyId: z.number(),
    trainId: z.number(),
    arrivalDate: z.coerce.date(),
    departDate: z.coerce.date(),
  }),
});

export const tripIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const tripUpdateSchema = z.object({
  body: z
    .object({
      name: z.string(),
      journeyId: z.number(),
      trainId: z.number(),
      arrivalDate: z.date(),
      departDate: z.date(),
    })
    .partial(),
});

export type tripCreateInput = z.infer<typeof tripCreateSchema>["body"];
export type tripIdParamInput = z.infer<typeof tripIdParamInputSchema>["params"];
export type tripUpdateInput = z.infer<typeof tripUpdateSchema>["body"];
