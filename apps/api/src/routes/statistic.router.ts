import { Router } from "express";

import {
  getStatisticOrdersTimelineHandler,
  getStatisticPopularHandler,
  getStatisticSummaryHandler,
} from "@/controllers/statistic.controller";
import { validate } from "@/middleware";
import {
  getStatisticOrdersTimelineQueryInputSchema,
  getStatisticPopularJourneysQueryInputSchema,
  getStatisticSummaryQueryInputSchema,
} from "@/schemas/statistic.schema";

export const statisticRouter = Router();

statisticRouter.get(
  "/summary",
  validate(getStatisticSummaryQueryInputSchema),
  getStatisticSummaryHandler,
);

statisticRouter.get(
  "/orders-timeline",
  validate(getStatisticOrdersTimelineQueryInputSchema),
  getStatisticOrdersTimelineHandler,
);

statisticRouter.get(
  "/popular-journeys",
  validate(getStatisticPopularJourneysQueryInputSchema),
  getStatisticPopularHandler,
);
