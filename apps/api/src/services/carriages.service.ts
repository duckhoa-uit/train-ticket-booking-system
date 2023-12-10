import prisma from "@ttbs/prisma";

import { CarriageCreateInput, CarriageUpdateInput } from "@/schemas/carriages.schema";

export const createCarriage = async (input: CarriageCreateInput) => {
  return await prisma.carriage.create({
    data: {
      code: input.code,
      name: input.name,
      order: input.order,
      seatTypeId: input.seatTypeId,
      trainId: input.trainId,
      seatsPerCabin: input.seatsPerCabin,
      seats: {
        createMany: {
          data: input.seats.map((_) => ({
            order: _.order,
          })),
        },
      },
    },
  });
};

export const getAllCarriages = async () => {
  return await prisma.carriage.findMany({
    include: {
      seats: true,
      seatType: true,
      train: true,
    },
  });
};

export const getCarriageByID = async (id: number) => {
  return await prisma.carriage.findUnique({
    where: { id },
    include: {
      seats: true,
      seatType: true,
      train: true,
    },
  });
};

export const updateCarriage = async (id: number, input: CarriageUpdateInput) => {
  const existCarriage = await prisma.carriage.findUnique({
    where: { id },
    include: {
      seats: true,
      seatType: true,
      train: true,
    },
  });
  if (!existCarriage) return null;

  return await prisma.carriage.update({
    where: { id },
    data: {
      name: input.name,
      code: input.code,
      order: input.order,
      seatTypeId: input.seatTypeId,
      trainId: input.trainId,
      seatsPerCabin: input.seatsPerCabin,
    },
    include: {
      seats: true,
      seatType: true,
      train: true,
    },
  });
};

export const deleteCarriage = async (id: number) => {
  return await prisma.carriage.delete({
    where: { id },
  });
};
