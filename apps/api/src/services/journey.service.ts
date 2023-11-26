import prisma from "@ttbs/prisma";

import { JourneyCreateInput, JourneyUpdateInput } from "@/schemas/journey.schema";

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
  if (!existJourney) return null;

  return await prisma.journey.update({
    where: { id },
    data: {
      name: input.name ?? undefined,
      journeyStations: {
        set: input.journeyStations
          ? input.journeyStations.map((_) => ({
              journeyId_stationId: {
                journeyId: id,
                stationId: _.stationId,
                order: _.order,
              },
            }))
          : [],
      },
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
