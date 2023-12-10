import { NextFunction, Request, Response } from "express";

import { seatCreateInput, seatIdParamInput, seatUpdateInput } from "@/schemas/seat.schema";
import { createSeat, updateSeat, getAllSeats, getSeatByID, deleteSeat } from "@/services/seat.service";

export const createSeatHandler = async (
  req: Request<{}, {}, seatCreateInput>,
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

export const getSeatById = async (
  req: Request<seatIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const seateID = Number(req.params.id);

    const seat = await getSeatByID(seateID);
    return res.status(200).json({ status: "success", data: seat });
  } catch (error) {
    return next(error);
  }
};

export const updateSeatHandler = async (
  req: Request<seatIdParamInput, {}, seatUpdateInput>,
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
  req: Request<seatIdParamInput, {}, {}>,
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
