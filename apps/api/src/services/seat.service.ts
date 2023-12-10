import prisma from "@ttbs/prisma";

import { seatCreateInput, seatUpdateInput } from "@/schemas/seat.schema";

export const createSeat = async (input: seatCreateInput) => {
  return await prisma.seat.create({
    data: {
      order: input.order,
      carriageId: input.carriageId,
    },
  });
};

export const getAllSeats = async () => {
  return await prisma.seat.findMany({
    include: {
      carriage: true,
    },
  });
};

export const getSeatByID = async (id: number) => {
  return await prisma.seat.findUnique({
    where: { id },
    include: {
      carriage: true,
    },
  });
};

export const updateSeat = async (id: number, input: seatUpdateInput) => {
  const existSeat = await prisma.seat.findUnique({
    where: { id },
  });
  if (!existSeat) return null;

  return await prisma.seat.update({
    where: { id },
    data: {
      order: input.order,
      carriageId: input.carriageId,
    },
    include: {
      carriage: true,
    },
  });
};

export const deleteSeat = async (id: number) => {
  return await prisma.seat.delete({
    where: { id },
  });
};
