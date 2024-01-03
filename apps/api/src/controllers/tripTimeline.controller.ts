import { NextFunction, Request, Response } from "express";

import {
  tripTimelineCreateInput,
  tripTimelineUpdateInput,
  tripTimelineIdParamInput,
  tripTimelineCreateSchema,
  tripTimelineUpdateSchema,
} from "@/schemas/tripTimeline.schema";
import {
  createTripTimeline,
  getAllTripTimelines,
  getTripTimelineByID,
  updateTripTimeline,
} from "@/services/tripTimeline.service";

export const createTripTimelineHandler = async (
  req: Request<{}, {}, tripTimelineCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: reqBody } = tripTimelineCreateSchema.parse(req);
    const newTrip = await createTripTimeline(reqBody);
    return res.status(201).json({ status: "success", data: newTrip });
  } catch (error) {
    return next(error);
  }
};

export const getTripTimelineHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const allTrips = await getAllTripTimelines();
    return res.status(200).json({ status: "success", data: allTrips });
  } catch (error) {
    return next(error);
  }
};

export const getTripTimelineByIdHandler = async (
  req: Request<tripTimelineIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tripTimelineID = Number(req.params.id);

    const tripTimeline = await getTripTimelineByID(tripTimelineID);
    return res.status(200).json({ status: "success", data: tripTimeline });
  } catch (error) {
    return next(error);
  }
};

export const updateTripTimelineHandler = async (
  req: Request<tripTimelineIdParamInput, {}, tripTimelineUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: reqBody } = tripTimelineUpdateSchema.parse(req);
    const tripTimelineID = +req.params.id;

    const updatedTrip = await updateTripTimeline(tripTimelineID, reqBody);
    return res.status(200).json({ status: "success", data: updatedTrip });
  } catch (error) {
    return next(error);
  }
};
