import { z } from "zod";

export const carriageCreateSchema = z.object({
  body: z.object({
    name: z.string(),
    code: z.string(),
    order: z.number(),
    seatTypeId: z.number(),
    trainId: z.number(),
    seatsPerCabin: z.number(),
    seats: z.array(
      z.object({
        order: z.number(),
      })
    ),
  }),
});

export const carriageIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const carriageUpdateSchema = z.object({
  body: z
    .object({
      name: z.string(),
      code: z.string(),
      order: z.number(),
      seatTypeId: z.number(),
      trainId: z.number(),
      seatsPerCabin: z.number(),
    })
    .partial(),
});

export type CarriageCreateInput = z.infer<typeof carriageCreateSchema>["body"];
export type CarriageIdParamInput = z.infer<typeof carriageIdParamInputSchema>["params"];
export type CarriageUpdateInput = z.infer<typeof carriageUpdateSchema>["body"];
