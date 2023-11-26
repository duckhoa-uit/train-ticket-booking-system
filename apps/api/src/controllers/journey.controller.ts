import { NextFunction, Request, Response } from "express";

import { JourneyCreateInput, JourneyIdParamInput, JourneyUpdateInput } from "@/schemas/journey.schema";
import { createJourney, getJourneys, updateJourney } from "@/services/journey.service";

export const createJourneyHandler = async (
  req: Request<{}, {}, JourneyCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newJourney = await createJourney(req.body);
    return res.status(201).json({ status: "success", data: newJourney });
  } catch (error) {
    return next(error);
  }
};
export const updateJourneyHandler = async (
  req: Request<JourneyIdParamInput, {}, JourneyUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const journeyId = Number(req.params.id);

    const updatedJourney = await updateJourney(journeyId, req.body);
    return res.status(200).json({ status: "success", data: updatedJourney });
  } catch (error) {
    return next(error);
  }
};
export const getJourneysHandler = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const journeys = await getJourneys();
    return res.status(200).json({ status: "success", data: journeys });
  } catch (error) {
    return next(error);
  }
};
