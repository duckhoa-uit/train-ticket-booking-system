import { NextFunction, Request, Response } from "express";

import { CarriageCreateInput, CarriageIdParamInput, CarriageUpdateInput } from "@/schemas/carriages.schema";
import {
  createCarriage,
  getAllCarriages,
  getCarriageByID,
  updateCarriage,
  deleteCarriage,
} from "@/services/carriages.service";

export const createCarriageHandler = async (
  req: Request<{}, {}, CarriageCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCarriage = await createCarriage(req.body);
    return res.status(201).json({ status: "success", data: newCarriage });
  } catch (error) {
    return next(error);
  }
};

export const getCarriageHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const allCarriages = await getAllCarriages();
    return res.status(200).json({ status: "success", data: allCarriages });
  } catch (error) {
    return next(error);
  }
};

export const getCarriageById = async (
  req: Request<CarriageIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const carriageID = Number(req.params.id);

    const carriage = await getCarriageByID(carriageID);
    return res.status(200).json({ status: "success", data: carriage });
  } catch (error) {
    return next(error);
  }
};

export const updateCarriageHandler = async (
  req: Request<CarriageIdParamInput, {}, CarriageUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const carriageID = +req.params.id;

    const updatedCarriage = await updateCarriage(carriageID, req.body);
    return res.status(200).json({ status: "success", data: updatedCarriage });
  } catch (error) {
    return next(error);
  }
};

export const deleteCarriageHandler = async (
  req: Request<CarriageIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const carriageID = Number(req.params.id);

    await deleteCarriage(carriageID);
    return res.status(200).json({ status: "successfully deleted" });
  } catch (error) {
    return next(error);
  }
};
