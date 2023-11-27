import { NextFunction, Request, Response } from "express";

import { trainCreateInput, trainUpdateInput, trainIdParamInput } from "@/schemas/train.schema";
import { createTrain, getAllTrains, getTrainByID, updateTrain, deleteTrain } from "@/services/train.service";

export const createTrainHandler = async (
  req: Request<{}, {}, trainCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTrain = await createTrain(req.body);
    return res.status(201).json({ status: "success", data: newTrain });
  } catch (error) {
    return next(error);
  }
};

export const getTrainHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const allTrains = await getAllTrains();
    return res.status(201).json({ status: "success", data: allTrains });
  } catch (error) {
    return next(error);
  }
};

export const getTrainById = async (
  req: Request<trainIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainID = Number(req.params.id);

    const train = await getTrainByID(trainID);
    return res.status(200).json({ status: "success", data: train });
  } catch (error) {
    return next(error);
  }
};

export const updateTrainHandler = async (
  req: Request<trainIdParamInput, {}, trainUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainID = +req.params.id;

    const updatedTrain = await updateTrain(trainID, req.body);
    return res.status(200).json({ status: "success", data: updatedTrain });
  } catch (error) {
    return next(error);
  }
};

export const deleteTrainHandler = async (
  req: Request<trainIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const trainID = Number(req.params.id);

    await deleteTrain(trainID);
    return res.status(200).json({ status: "successfully deleted" });
  } catch (error) {
    return next(error);
  }
};
