import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";

import {
  GetSeatsOnTripParamInput,
  GetPriceOnTripQueryInput,
  SearchTripQueryInput,
  TripCreateInput,
  TripIdParamInput,
  TripUpdateInput,
  getSeatsOnTripParamInputSchema,
  searchTripQueryInputSchema,
  tripCreateSchema,
  getPriceOnTripQueryInputSchema,
  tripIdParamInputSchema,
  getSeatsOnTripQueryInputSchema,
} from "@/schemas/trip.schema";
import {
  createTrip,
  getAllTrips,
  getPricesOnTrip,
  getSeatsOnTripById,
  getTripByID,
  updateTrip,
} from "@/services/trip.service";

export const createTripHandler = async (
  req: Request<{}, {}, TripCreateInput>,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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
  next: NextFunction,
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
  next: NextFunction,
) => {
  try {
    const tripID = +req.params.id;

    const updatedTrip = await updateTrip(tripID, req.body);
    return res.status(200).json({ status: "success", data: updatedTrip });
  } catch (error) {
    return next(error);
  }
};

export const getSeatsOnTripHandler = async (
  req: Request<
    GetSeatsOnTripParamInput,
    {},
    {},
    GetPriceOnTripQueryInput & ParsedQs
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: tripId },
    } = getSeatsOnTripParamInputSchema.parse(req);

    const { query } = getSeatsOnTripQueryInputSchema.parse(req);

    const seats = await getSeatsOnTripById(tripId, query);
    return res.status(200).json({ status: "success", data: seats });
  } catch (error) {
    return next(error);
  }
};
export const getPriceOnTripHandler = async (
  req: Request<
    GetSeatsOnTripParamInput,
    {},
    {},
    GetPriceOnTripQueryInput & ParsedQs
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: tripId },
    } = tripIdParamInputSchema.parse(req);
    const {
      query: { departStationId, arrivalStationId, seatTypeId },
    } = getPriceOnTripQueryInputSchema.parse(req);

    const seats = await getPricesOnTrip({
      tripId,
      seatTypeId,
      departStationId,
      arrivalStationId,
    });
    return res.status(200).json({ status: "success", data: seats });
  } catch (error) {
    return next(error);
  }
};
