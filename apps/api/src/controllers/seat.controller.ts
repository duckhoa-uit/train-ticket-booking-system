import { NextFunction, Request, Response } from "express";

import {
  GetTripTimelineBySeatInput,
  SeatCreateInput,
  SeatIdParamInput,
  SeatUpdateInput,
  getTripTimelineBySeatQueryInputSchema,
} from "@/schemas/seat.schema";
import { createSeat, updateSeat, getAllSeats, getSeatByID, deleteSeat } from "@/services/seat.service";

export const createSeatHandler = async (
  req: Request<{}, {}, SeatCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSeat = await createSeat(req.body);
    return res.status(201).json({ status: "success", data: newSeat });
  } catch (error) {
    return next(error);
  }
};

export const getSeatHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const allSeats = await getAllSeats();
    return res.status(200).json({ status: "success", data: allSeats });
  } catch (error) {
    return next(error);
  }
};

export const getSeatByIdHandler = async (
  req: Request<SeatIdParamInput, {}, {}, GetTripTimelineBySeatInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const seatId = Number(req.params.id);
    const {
      query: { departStationId },
    } = getTripTimelineBySeatQueryInputSchema.parse(req);

    const seat = await getSeatByID(seatId, { departStationId });
    return res.status(200).json({ status: "success", data: seat });
  } catch (error) {
    return next(error);
  }
};

export const updateSeatHandler = async (
  req: Request<SeatIdParamInput, {}, SeatUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const seatID = +req.params.id;

    const updatedSeat = await updateSeat(seatID, req.body);
    return res.status(200).json({ status: "success", data: updatedSeat });
  } catch (error) {
    return next(error);
  }
};

export const deleteSeatHandler = async (
  req: Request<SeatIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const seatID = Number(req.params.id);

    await deleteSeat(seatID);
    return res.status(200).json({ status: "successfully deleted" });
  } catch (error) {
    return next(error);
  }
};
