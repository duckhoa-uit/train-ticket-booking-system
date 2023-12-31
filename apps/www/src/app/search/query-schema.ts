import { z } from "zod";

import { searchTripQuerySchema } from "../trips/[tripId]/query-schema";

export const listQuerySchema = z.object({
  skip: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(10),
  orderBy: z.string().optional().default(""),
});
export const searchTripsQuerySchema = z
  .object({
    timeRange: z
      .string()
      .optional()
      .default("")
      .or(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)),
  })
  .merge(searchTripQuerySchema)
  .merge(listQuerySchema);
