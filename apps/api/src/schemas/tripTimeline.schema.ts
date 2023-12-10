import { z } from "zod";

export const tripTimelineCreateSchema = z.object({
  body: z.object({
    tripId: z.number(),
    journeyStationId: z.number(),
    arrivalDate: z.coerce.date(),
    departDate: z.coerce.date(),
  }),
});

export const tripTimelineIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const tripTimelineUpdateSchema = z.object({
  body: z
    .object({
      tripId: z.number(),
      journeyStationId: z.number(),
      arrivalDate: z.coerce.date(),
      departDate: z.coerce.date(),
    })
    .partial(),
});

export type tripTimelineCreateInput = z.infer<typeof tripTimelineCreateSchema>["body"];
export type tripTimelineIdParamInput = z.infer<typeof tripTimelineIdParamInputSchema>["params"];
export type tripTimelineUpdateInput = z.infer<typeof tripTimelineUpdateSchema>["body"];
