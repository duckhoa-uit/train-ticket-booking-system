import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";

import {
  GetStatisticOrdersTimelineQueryInput,
  GetStatisticPopularJourneysQueryInput,
  GetStatisticSummaryQueryInput,
  getStatisticOrdersTimelineQueryInputSchema,
  getStatisticPopularJourneysQueryInputSchema,
  getStatisticSummaryQueryInputSchema,
} from "@/schemas/statistic.schema";
import {
  getStatisticOrdersTimeline,
  getStatisticPopularJourneys,
  getStatisticSummary,
} from "@/services/statistic.service";

export const getStatisticSummaryHandler = async (
  req: Request<{}, {}, {}, GetStatisticSummaryQueryInput & ParsedQs>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = getStatisticSummaryQueryInputSchema.parse(req);

    const seat = await getStatisticSummary(query);
    return res.status(200).json({ status: "success", data: seat });
  } catch (error) {
    return next(error);
  }
};
export const getStatisticOrdersTimelineHandler = async (
  req: Request<{}, {}, {}, GetStatisticOrdersTimelineQueryInput & ParsedQs>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = getStatisticOrdersTimelineQueryInputSchema.parse(req);

    const seat = await getStatisticOrdersTimeline(query);
    return res.status(200).json({ status: "success", data: seat });
  } catch (error) {
    return next(error);
  }
};

export const getStatisticPopularHandler = async (
  req: Request<{}, {}, {}, GetStatisticPopularJourneysQueryInput & ParsedQs>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = getStatisticPopularJourneysQueryInputSchema.parse(req);

    const seat = await getStatisticPopularJourneys(query);
    return res.status(200).json({ status: "success", data: seat });
  } catch (error) {
    return next(error);
  }
};
