import { z } from "zod";

export const searchTripsQuerySchema = z.object({
  skip: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(10),
  departStation: z.coerce.number(),
  arrivalStation: z.coerce.number(),
  date: z.string().datetime(),
  orderBy: z.string().optional().default(""),
  timeRange: z
    .string()
    .optional()
    .default("")
    .or(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)),
});
