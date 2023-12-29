import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";

import {
  TripCreateInput,
  TripUpdateInput,
  TripIdParamInput,
  tripCreateSchema,
  SearchTripQueryInput,
  searchTripQueryInputSchema,
} from "@/schemas/trip.schema";
import { createTrip, getAllTrips, getTripByID, updateTrip } from "@/services/trip.service";

export const createTripHandler = async (
  req: Request<{}, {}, TripCreateInput>,
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

export const getTripsHandler = async (
  req: Request<{}, {}, {}, SearchTripQueryInput & ParsedQs>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = searchTripQueryInputSchema.parse(req);
    const { trips, count } = await getAllTrips(query);

    return res.status(200).json({ status: "success", data: trips, count });
  } catch (error) {
    return next(error);
  }
};

export const getTripById = async (
  req: Request<TripIdParamInput, {}, {}>,
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
  req: Request<TripIdParamInput, {}, TripUpdateInput>,
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
