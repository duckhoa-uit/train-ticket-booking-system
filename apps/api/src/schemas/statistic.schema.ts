import { z } from "zod";

export const getStatisticSummaryQueryInputSchema = z.object({
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
});
export const getStatisticOrdersTimelineQueryInputSchema = z.object({
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    timeView: z.enum(["year", "week", "month", "day"]),
  }),
});
export const getStatisticPopularJourneysQueryInputSchema = z.object({
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
});

export type GetStatisticSummaryQueryInput = z.infer<typeof getStatisticSummaryQueryInputSchema>["query"];
export type GetStatisticOrdersTimelineQueryInput = z.infer<
  typeof getStatisticOrdersTimelineQueryInputSchema
>["query"];
export type GetStatisticPopularJourneysQueryInput = z.infer<
  typeof getStatisticPopularJourneysQueryInputSchema
>["query"];
