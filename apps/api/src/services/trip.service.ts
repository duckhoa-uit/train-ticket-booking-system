import prisma from "@ttbs/prisma";

import { tripCreateInput, tripUpdateInput } from "@/schemas/trip.schema";

export const createTrip = async (input: tripCreateInput) => {
  return await prisma.trip.create({
    data: {
      name: input.name,
      journeyId: input.journeyId,
      trainId: input.trainId,
      arrivalDate: input.arrivalDate,
      departDate: input.departDate,
    },
  });
};

export const getAllTrips = async () => {
  return await prisma.trip.findMany({
    include: {
      train: true,
      journey: true,
    },
  });
};

export const getTripByID = async (id: number) => {
  return await prisma.trip.findUnique({
    where: { id },
    include: {
      train: true,
      journey: true,
    },
  });
};

export const updateTrip = async (id: number, input: tripUpdateInput) => {
  const existTrip = await prisma.trip.findUnique({
    where: { id },
  });
  if (!existTrip) return null;

  return await prisma.trip.update({
    where: { id },
    data: {
      name: input.name,
      journeyId: input.journeyId,
      trainId: input.trainId,
      arrivalDate: input.arrivalDate,
      departDate: input.departDate,
    },
  });
};
