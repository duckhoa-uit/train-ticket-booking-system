import { z } from "zod";

export const searchTripQuerySchema = z.object({
  departStation: z.coerce.number(),
  arrivalStation: z.coerce.number(),
  date: z.string().datetime(),
});

export const tripDetailsQuerySchema = z
  .object({
    carriageId: z.coerce.number(),
  })
  .merge(searchTripQuerySchema);
