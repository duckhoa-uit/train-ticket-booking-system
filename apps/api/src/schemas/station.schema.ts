import { z } from "zod";

export const stationCreateSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(50),
    code: z.string().min(1).max(10),
  }),
});

export const stationIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const stationUpdateSchema = z.object({
  body: z
    .object({
      name: z.string().min(5).max(50),
      code: z.string().min(1).max(10),
    })
    .partial(),
});

export type StationCreateInput = z.infer<typeof stationCreateSchema>["body"];
export type StationIdParamInput = z.infer<typeof stationIdParamInputSchema>["params"];
export type StationUpdateInput = z.infer<typeof stationUpdateSchema>["body"];
