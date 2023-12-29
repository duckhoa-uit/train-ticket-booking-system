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
            })
          )
          .optional(),
      })
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

export const searchTripQueryInputSchema = z.object({
  query: z
    .object({
      skip: z.coerce.number().optional().default(0),
      limit: z.coerce.number().optional().default(10),
      departStationId: z.coerce.number().optional(),
      arrivalStationId: z.coerce.number().optional(),
      departDate: z.coerce.date().optional(),
      timeRange: z
        .string()
        .optional()
        .or(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)),
      orderBy: z.enum(["departDate|asc", "departDate|desc"]).optional(),
    })
    .refine((schema) => {
      if (schema.departDate || schema.timeRange) return true;

      return false;
    }, "Missing query! Please provide departDate or timeRange"),
});

export type TripCreateInput = z.infer<typeof tripCreateSchema>["body"];
export type TripIdParamInput = z.infer<typeof tripIdParamInputSchema>["params"];
export type TripUpdateInput = z.infer<typeof tripUpdateSchema>["body"];
export type SearchTripQueryInput = z.infer<typeof searchTripQueryInputSchema>["query"];
