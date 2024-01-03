import prisma from "@ttbs/prisma";
import type { Prisma } from "@ttbs/prisma";

import { OrderCreateInput, OrderUpdateInput } from "@/schemas/order.schema";

export const createOrder = async (
  input: Omit<OrderCreateInput, "tickets"> & {
    tickets: Prisma.TicketCreateManyOrderInput[];
  }
) => {
  return await prisma.order.create({
    data: {
      buyerName: input.buyerName,
      buyerIdentification: input.buyerIdentification,
      buyerPhone: input.buyerPhone,
      buyerEmail: input.buyerEmail,
      tickets: {
        createMany: {
          data: input.tickets.map((ticket) => ({
            seatId: ticket.seatId,
            fromTimelineId: ticket.fromTimelineId,
            toTimelineId: ticket.toTimelineId,
            amount: ticket.amount,
            userName: ticket.userName,
            userIdentification: ticket.userIdentification,
          })),
        },
      },
    },
  });
};

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      tickets: true,
    },
  });
};

export const getOrderByID = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      tickets: true,
    },
  });
};

export const updateOrder = async (id: number, input: OrderUpdateInput) => {
  const existOrder = await prisma.order.findUnique({
    where: { id },
  });
  if (!existOrder) return null;

  return await prisma.order.update({
    where: { id },
    data: {
      buyerName: input.buyerName,
      buyerIdentification: input.buyerIdentification,
      buyerPhone: input.buyerPhone,
      buyerEmail: input.buyerEmail,
    },
  });
};
