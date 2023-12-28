import prisma from "@ttbs/prisma";

import { trainCreateInput, trainUpdateInput } from "@/schemas/train.schema";

export const createTrain = async (input: trainCreateInput) => {
  return await prisma.train.create({
    data: {
      code: input.code,
      name: input.name,
      carriages: {
        createMany: {
          data: input.carriages.map((_) => ({
            seatTypeId: _.seatTypeId,
            code: _.code,
            name: _.name,
            order: _.order,
            seatsPerCabin: _.seatsPerCabin,
            numOfCabins: _.numOfCabins,
          })),
        },
      },
    },
  });
};

export const getAllTrains = async () => {
  return await prisma.train.findMany({
    include: {
      carriages: true,
    },
  });
};

export const getTrainByID = async (id: number) => {
  return await prisma.train.findUnique({
    where: { id },
    include: {
      carriages: {
        include: {
          seatType: true,
        },
      },
    },
  });
};

export const updateTrain = async (id: number, input: trainUpdateInput) => {
  const existTrain = await prisma.train.findUnique({
    where: { id },
    include: {
      carriages: true,
    },
  });
  if (!existTrain) return null;

  const newCarriages = input.carriages ?? [];

  return await prisma.train.update({
    where: { id },
    data: {
      name: input.name ?? undefined,
      code: input.code ?? undefined,
      carriages: {
        upsert: newCarriages.map((carriage) => ({
          where: {
            trainId_order: {
              order: carriage.order,
              trainId: id,
            },
          },
          update: {
            seatTypeId: carriage.seatTypeId,
            code: carriage.code,
            name: carriage.name,
            order: carriage.order,
            seatsPerCabin: carriage.seatsPerCabin,
            numOfCabins: carriage.numOfCabins,
          },
          create: {
            seatTypeId: carriage.seatTypeId,
            code: carriage.code,
            name: carriage.name,
            order: carriage.order,
            seatsPerCabin: carriage.seatsPerCabin,
            numOfCabins: carriage.numOfCabins,
          },
        })),
      },
    },
  });
};

export const deleteTrain = async (id: number) => {
  return await prisma.train.delete({
    where: { id },
  });
};
