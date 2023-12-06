import { NextFunction, Request, Response } from "express";

import {
  JourneyCreateInput,
  JourneyIdParamInput,
  JourneyUpdateInput,
  journeyIdParamInputSchema,
  journeyUpdateSchema,
} from "@/schemas/journey.schema";
import { createJourney, getJourneyById, getJourneys, updateJourney } from "@/services/journey.service";
import AppError from "@/utils/app-error";

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
    const { body: reqBody } = journeyUpdateSchema.parse(req);
    const journeyId = Number(req.params.id);

    // const journey = await getJourneyById(journeyId);
    // if (!journey) throw new AppError(404, "Not found journey with id: " + journeyId);

    // const oldStations = journey.journeyStations
    // const newStations = reqBody.journeyStations ?? []

    // const unlinkStations = oldStations.filter(old => !newStations.map(_ => _.stationId).includes(old.stationId))
    // const updateStations = oldStations.filter(old => newStations.map(_ => _.stationId).includes(old.stationId))
    // const addedStations = newStations.filter(_new => !oldStations.map(_ => _.stationId).includes(_new.stationId))

    const updatedJourney = await updateJourney(journeyId, reqBody);
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
export const getJourneyByIdHandler = async (
  req: Request<JourneyIdParamInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = journeyIdParamInputSchema.parse(req);

    const journey = await getJourneyById(id);
    if (!journey) throw new AppError(404, "Not found journey with id: " + id);

    return res.status(200).json({ status: "success", data: journey });
  } catch (error) {
    return next(error);
  }
};
