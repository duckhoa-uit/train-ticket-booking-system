import { NextFunction, Request, Response } from "express";

import { Prisma } from "@ttbs/prisma";

import { StationCreateInput, StationIdParamInput, StationUpdateInput } from "@/schemas/station.schema";
import { createStation, getStationById, getStations, updateStation } from "@/services/station.service";

export const createStationHandler = async (
  req: Request<{}, {}, StationCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newStation = await createStation(req.body);
    return res.status(201).json({ status: "success", data: newStation });
  } catch (error) {
    // Ref: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(409).json({
          status: "fail",
          message: "Code already exist, please use another",
        });
        return;
      }
    }
    return next(error);
  }
};
export const updateStationHandler = async (
  req: Request<StationIdParamInput, {}, StationUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const stationId = Number(req.params.id);

    const updatedStation = await updateStation(stationId, req.body);
    return res.status(200).json({ status: "success", data: updatedStation });
  } catch (error) {
    return next(error);
  }
};
export const getStationsHandler = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const stations = await getStations();
    return res.status(200).json({ status: "success", data: stations });
  } catch (error) {
    return next(error);
  }
};

export const getStationByIdHandler = async (
  req: Request<StationIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const stationId = Number(req.params.id);

    const station = await getStationById(stationId);
    return res.status(200).json({ status: "success", data: station });
  } catch (error) {
    return next(error);
  }
};
