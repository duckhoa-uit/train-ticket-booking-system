import { NextFunction, Request, Response } from "express";

import { StationCreateInput, StationIdParamInput, StationUpdateInput } from "@/schemas/station.schema";
import { createStation, getStations, updateStation } from "@/services/station.service";

export const createStationHandler = async (
  req: Request<{}, {}, StationCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newStation = await createStation(req.body);
    return res.status(201).json({ status: "success", data: newStation });
  } catch (error) {
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
