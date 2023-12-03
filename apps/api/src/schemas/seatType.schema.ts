import { z } from "zod";

export const seatTypeCreateSchema = z.object({
  body: z
    .object({
      floors: z.number(),
      name: z.string(),
      seatsPerRow: z.number().optional(),
    })
    .refine((schema) => {
      if (schema.floors === 1 && schema.seatsPerRow) return true;
      if (schema.floors > 1) return true;
      return false;
    }, "Invalid information! Please type again"),
});

export const seatTypeIdParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export type seatTypeCreateInput = z.infer<typeof seatTypeCreateSchema>["body"];
export type seatTypeIdParamInput = z.infer<typeof seatTypeIdParamInputSchema>["params"];
