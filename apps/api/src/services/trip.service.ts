import prisma, { Prisma } from "@ttbs/prisma";

import { TripCreateInput, TripUpdateInput } from "@/schemas/trip.schema";

export const createTrip = async (input: TripCreateInput) => {
  return prisma.$transaction(async (tx) => {
    const newTrip = await tx.trip.create({
      data: {
        name: input.name,
        journeyId: input.journeyId,
        trainId: input.trainId,
        arrivalDate: input.arrivalDate ?? input.timelines[0].arrivalDate,
        departDate:
          input.departDate ??
          input.timelines[input.timelines.length - 1].departDate,
        timelines: {
          createMany: {
            data: input.timelines.map((timeline) => ({
              journeyStationId: timeline.journeyStationId,
              arrivalDate: timeline.arrivalDate,
              departDate: timeline.departDate,
            })),
          },
        },
      },
    });

    const prices = input.timelines.flatMap<Prisma.PricingCreateManyInput>(
      (timeline) =>
        (timeline.prices ?? []).map((price) => ({
          ...price,
          tripId: newTrip.id,
        })),
    );
    console.log(
      "🚀 ~ file: trip.service.ts:27 ~ returnprisma.$transaction ~ prices:",
      prices,
    );

    await tx.pricing.createMany({
      data: prices,
    });

    return newTrip;
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

export const updateTrip = async (id: number, input: TripUpdateInput) => {
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
