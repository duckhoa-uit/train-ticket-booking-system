import prisma from "@ttbs/prisma";

import {
  tripTimelineCreateInput,
  tripTimelineUpdateInput,
} from "@/schemas/tripTimeline.schema";

export const createTripTimeline = async (input: tripTimelineCreateInput) => {
  return await prisma.tripTimeline.create({
    data: {
      tripId: input.tripId,
      journeyStationId: input.journeyStationId,
      arrivalDate: input.arrivalDate,
      departDate: input.departDate,
    },
  });
};

export const getAllTripTimelines = async () => {
  return await prisma.tripTimeline.findMany({
    include: {
      trip: true,
      journeyStation: true,
    },
  });
};

export const getTripTimelineByID = async (id: number) => {
  return await prisma.tripTimeline.findUnique({
    where: { id },
    include: {
      trip: true,
      journeyStation: true,
    },
  });
};
export const getTripTimelineByStationId = async (
  tripId: number,
  stationId: number,
) => {
  return await prisma.tripTimeline.findFirst({
    where: {
      tripId,
      journeyStation: {
        stationId,
      },
    },
    include: {
      trip: true,
      journeyStation: true,
    },
  });
};

export const updateTripTimeline = async (
  id: number,
  input: tripTimelineUpdateInput,
) => {
  const existTripTimeline = await prisma.tripTimeline.findUnique({
    where: { id },
  });
  if (!existTripTimeline) return null;

  return await prisma.tripTimeline.update({
    where: { id },
    data: {
      tripId: input.tripId,
      journeyStationId: input.journeyStationId,
      arrivalDate: input.arrivalDate,
      departDate: input.departDate,
    },
  });
};
