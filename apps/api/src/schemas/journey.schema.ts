import { z } from "zod";

export const journeyCreateSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(50),
    journeyStations: z.array(
      z.object({
        stationId: z.number(),
        order: z.number(),
      })
    ),
  }),
});

export const journeyIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const journeyUpdateSchema = z.object({
  body: z
    .object({
      name: z.string().min(5).max(50),
      journeyStations: z.array(
        z.object({
          stationId: z.number(),
          order: z.number(),
        })
      ),
    })
    .partial(),
});

export type JourneyCreateInput = z.infer<typeof journeyCreateSchema>["body"];
export type JourneyIdParamInput = z.infer<typeof journeyIdParamInputSchema>["params"];
export type JourneyUpdateInput = z.infer<typeof journeyUpdateSchema>["body"];
