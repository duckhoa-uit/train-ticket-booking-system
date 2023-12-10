import { NextFunction, Request, Response } from "express";

import { tripCreateInput, tripUpdateInput, tripIdParamInput, tripCreateSchema } from "@/schemas/trip.schema";
import { createTrip, getAllTrips, getTripByID, updateTrip } from "@/services/trip.service";

export const createTripHandler = async (
  req: Request<{}, {}, tripCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: reqBody } = tripCreateSchema.parse(req);
    const newTrip = await createTrip(reqBody);
    return res.status(201).json({ status: "success", data: newTrip });
  } catch (error) {
    return next(error);
  }
};

export const getTripHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const allTrips = await getAllTrips();
    return res.status(200).json({ status: "success", data: allTrips });
  } catch (error) {
    return next(error);
  }
};

export const getTripById = async (
  req: Request<tripIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tripID = Number(req.params.id);

    const trip = await getTripByID(tripID);
    return res.status(200).json({ status: "success", data: trip });
  } catch (error) {
    return next(error);
  }
};

export const updateTripHandler = async (
  req: Request<tripIdParamInput, {}, tripUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tripID = +req.params.id;

    const updatedTrip = await updateTrip(tripID, req.body);
    return res.status(200).json({ status: "success", data: updatedTrip });
  } catch (error) {
    return next(error);
  }
};
