import prisma from "@ttbs/prisma";

import { SeatCreateInput, SeatUpdateInput } from "@/schemas/seat.schema";

import { getTripTimelineByStationId } from "./tripTimeline.service";

export const createSeat = async (input: SeatCreateInput) => {
  return await prisma.seat.create({
    data: {
      tripId: input.tripId,
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

export const getSeatByID = async (
  id: number,
  extra?: { departStationId?: number },
) => {
  const { departStationId } = extra ?? {};

  const seat = await prisma.seat.findUnique({
    where: { id },
    include: {
      carriage: {
        include: {
          train: true,
          seatType: true,
        },
      },
      trip: true,
    },
  });
  if (!seat) return seat;

  const { carriage, ...seatWithoutCarriage } = seat;
  const { train, seatType, ...carriageWithoutTrain } = carriage ?? {};

  const fromTimeline = departStationId
    ? await getTripTimelineByStationId(seat.tripId, departStationId)
    : undefined;

  return {
    ...seatWithoutCarriage,
    carriage: carriageWithoutTrain,
    train,
    seatType,
    departTime: fromTimeline?.departDate,
  };
};

export const updateSeat = async (id: number, input: SeatUpdateInput) => {
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
