import prisma from "@ttbs/prisma";

import {
  StationCreateInput,
  StationUpdateInput,
} from "@/schemas/station.schema";

export const createStation = async (input: StationCreateInput) => {
  return await prisma.station.create({
    data: input,
  });
};

export const updateStation = async (id: number, input: StationUpdateInput) => {
  return await prisma.station.update({
    where: { id },
    data: input,
  });
};

export const getStations = async () => {
  return await prisma.station.findMany();
};

export const getStationById = async (id: number) => {
  return await prisma.station.findUnique({
    where: {
      id,
    },
  });
};
