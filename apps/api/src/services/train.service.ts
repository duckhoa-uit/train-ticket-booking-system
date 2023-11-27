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
      carriages: true,
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

  return await prisma.train.update({
    where: { id },
    data: {
      name: input.name ?? undefined,
      code: input.code ?? undefined,
      // set: input.carriages
      //     ? input.carriages.map((_) => ({
      //         id: _.id,
      //         name: _.name,
      //         code: _.code,
      //         order: _.order,
      //         seatsPerCabin: _.seatsPerCabin
      //     }))
      //     : undefined,
    },
  });
};
//add toa, remo ev toa, reorder toa
// edit toa
export const deleteTrain = async (id: number) => {
  return await prisma.train.delete({
    where: { id },
  });
};
