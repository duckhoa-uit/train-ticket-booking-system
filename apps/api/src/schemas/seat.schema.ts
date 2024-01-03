import { z } from "zod";

export const seatCreateSchema = z.object({
  body: z.object({
    order: z.number(),
    tripId: z.number(),
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
      tripId: z.number(),
      carriageId: z.number(),
    })
    .partial(),
});

export const getTripTimelineBySeatQueryInputSchema = z.object({
  query: z.object({
    departStationId: z.coerce.number().optional(),
  }),
});

export type SeatCreateInput = z.infer<typeof seatCreateSchema>["body"];
export type SeatIdParamInput = z.infer<typeof seatIdParamInputSchema>["params"];
export type SeatUpdateInput = z.infer<typeof seatUpdateSchema>["body"];
export type GetTripTimelineBySeatInput = z.infer<
  typeof getTripTimelineBySeatQueryInputSchema
>["query"];
