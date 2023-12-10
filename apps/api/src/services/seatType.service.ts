import prisma from "@ttbs/prisma";

import { seatTypeCreateInput } from "@/schemas/seatType.schema";

export const createSeatType = async (input: seatTypeCreateInput) => {
  let seatPerRow;
  if (input.floors === 1) {
    seatPerRow = input.seatsPerRow;
  } else if (input.floors > 1) {
    seatPerRow = input.floors;
  } else {
    seatPerRow = 1;
  }
  return await prisma.seatType.create({
    data: {
      floors: input.floors,
      name: input.name,
      seatsPerRow: seatPerRow || 0,
    },
  });
};

export const getAllSeatTypes = async () => {
  return await prisma.seatType.findMany({});
};

export const getSeatTypeByID = async (id: number) => {
  return await prisma.seatType.findUnique({
    where: { id },
  });
};
