import { z } from "zod";

export const tripCreateSchema = z.object({
  body: z.object({
    name: z.string(),
    journeyId: z.number(),
    trainId: z.number(),
    arrivalDate: z.coerce.date().optional(),
    departDate: z.coerce.date().optional(),
    timelines: z.array(
      z.object({
        journeyStationId: z.number(),
        arrivalDate: z.coerce.date(),
        departDate: z.coerce.date(),
        prices: z
          .array(
            z.object({
              seatTypeId: z.number(),
              departStationId: z.number(),
              arrivalStationId: z.number(),
              amount: z.number(),
            }),
          )
          .optional(),
      }),
    ),
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

export type TripCreateInput = z.infer<typeof tripCreateSchema>["body"];
export type TripIdParamInput = z.infer<typeof tripIdParamInputSchema>["params"];
export type TripUpdateInput = z.infer<typeof tripUpdateSchema>["body"];
