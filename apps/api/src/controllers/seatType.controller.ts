import { NextFunction, Request, Response } from "express";

import { seatTypeCreateInput, seatTypeIdParamInput } from "@/schemas/seatType.schema";
import { createSeatType, getAllSeatTypes, getSeatTypeByID } from "@/services/seatType.service";

export const createSeatTypeHandler = async (
  req: Request<{}, {}, seatTypeCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSeatType = await createSeatType(req.body);
    return res.status(201).json({ status: "success", data: newSeatType });
  } catch (error) {
    return next(error);
  }
};

export const getSeatTypeHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const allSeatTypes = await getAllSeatTypes();
    return res.status(200).json({ status: "success", data: allSeatTypes });
  } catch (error) {
    return next(error);
  }
};

export const getSeatTypeById = async (
  req: Request<seatTypeIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const seateTypeID = Number(req.params.id);

    const seatType = await getSeatTypeByID(seateTypeID);
    return res.status(200).json({ status: "success", data: seatType });
  } catch (error) {
    return next(error);
  }
};
