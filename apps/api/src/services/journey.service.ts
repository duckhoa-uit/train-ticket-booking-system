import prisma from "@ttbs/prisma";

import { JourneyCreateInput, JourneyUpdateInput } from "@/schemas/journey.schema";
import AppError from "@/utils/app-error";

export const createJourney = async (input: JourneyCreateInput) => {
  return await prisma.journey.create({
    data: {
      name: input.name,
      journeyStations: {
        createMany: {
          data: input.journeyStations.map((_) => ({
            stationId: _.stationId,
            order: _.order,
          })),
        },
      },
    },
  });
};
export const updateJourney = async (id: number, input: JourneyUpdateInput) => {
  const existJourney = await prisma.journey.findUnique({
    where: { id },
    include: {
      journeyStations: true,
    },
  });
  if (!existJourney) throw new AppError(404, "Not found journey with id: " + id);

  const oldStations = existJourney.journeyStations;
  const newStations = input.journeyStations ?? [];

  const unlinkStations = oldStations.filter(
    (old) => !newStations.map((_) => _.stationId).includes(old.stationId)
  );

  return await prisma.journey.update({
    where: { id },
    data: {
      name: input.name ?? undefined,
      journeyStations: {
        deleteMany: unlinkStations.map((_) => ({ id: _.id })),
        upsert: newStations.map((station) => ({
          where: { journeyId_stationId: { stationId: station.stationId, journeyId: id } },
          update: {
            order: station.order,
          },
          create: {
            stationId: station.stationId,
            order: station.order,
          },
        })),
      },
    },
    include: {
      journeyStations: true,
    },
  });
};

export const getJourneys = async () => {
  return await prisma.journey.findMany({
    include: {
      journeyStations: true,
    },
  });
};

export const getJourneyById = async (id: number) => {
  return await prisma.journey.findUnique({
    where: { id },
    include: {
      journeyStations: true,
    },
  });
};
