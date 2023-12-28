import { z } from "zod";

export const trainCreateSchema = z.object({
  body: z.object({
    code: z.string(),
    name: z.string(),
    carriages: z.array(
      z.object({
        seatTypeId: z.number(),
        code: z.string(),
        name: z.string(),
        order: z.number(),
        seatsPerCabin: z.number(),
        numOfCabins: z.number().optional().default(1),
      })
    ),
  }),
});

export const traindParamInputSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export const trainUpdateSchema = z.object({
  body: z
    .object({
      code: z.string(),
      name: z.string(),
      carriages: z.array(
        z.object({
          seatTypeId: z.number(),
          code: z.string(),
          name: z.string(),
          order: z.number(),
          seatsPerCabin: z.number(),
          numOfCabins: z.number().optional().default(1),
        })
      ),
    })
    .partial(),
});

export type trainCreateInput = z.infer<typeof trainCreateSchema>["body"];
export type trainIdParamInput = z.infer<typeof traindParamInputSchema>["params"];
export type trainUpdateInput = z.infer<typeof trainUpdateSchema>["body"];
