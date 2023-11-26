import { z } from "zod";

export const routeCreateSchema = z.object({
  body: z.object({
    depart_station: z.string(),
    arrive_station: z.string(),
    depart_time: z.string(),
    arrive_time: z.string(),
    depart_day: z.string(),
  }),
});

export const routeGetAllSchema = z.object({
  query: z.object({
    offset: z.coerce.number(),
    limit: z.coerce.number(),
  }),
});

export type RouteCreateInput = z.infer<typeof routeCreateSchema>["body"];
export type RouteGetAllInput = z.infer<typeof routeGetAllSchema>["query"];
