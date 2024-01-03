import { NextFunction, Request, Response } from "express";

import { Prisma } from "@ttbs/prisma";

import {
  OrderCreateInput,
  OrderIdParamInput,
  OrderUpdateInput,
  orderCreateSchema,
} from "@/schemas/order.schema";
import {
  createOrder,
  getAllOrders,
  getOrderByID,
  updateOrder,
} from "@/services/order.service";
import { getSeatByID } from "@/services/seat.service";
import { getTripTimelineByStationId } from "@/services/tripTimeline.service";
import AppError from "@/utils/app-error";

export const createOrderHandler = async (
  req: Request<{}, {}, OrderCreateInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body: reqBody } = orderCreateSchema.parse(req);
    const { tickets, ...bodyWithoutTickets } = reqBody;

    const modifiedTickets = await Promise.all(
      tickets.map<Promise<Prisma.TicketCreateManyOrderInput>>(async (t) => {
        const seat = await getSeatByID(t.seatId);
        if (!seat) throw new AppError(404, "Invalid seat");

        const fromTimeline = await getTripTimelineByStationId(
          seat.tripId,
          t.fromStationId,
        );
        const toTimeline = await getTripTimelineByStationId(
          seat.tripId,
          t.toStationId,
        );
        if (!fromTimeline || !toTimeline)
          throw new AppError(404, "Invalid seat");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fromStationId, toStationId, ...ticketWithoutStations } = t;

        return {
          ...ticketWithoutStations,
          fromTimelineId: fromTimeline.id,
          toTimelineId: toTimeline.id,
        };
      }),
    );

    const newOrder = await createOrder({
      ...bodyWithoutTickets,
      tickets: modifiedTickets,
    });
    return res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    return next(error);
  }
};

export const getOrderHandler = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allOrders = await getAllOrders();
    return res.status(200).json({ status: "success", data: allOrders });
  } catch (error) {
    return next(error);
  }
};

export const getOrderById = async (
  req: Request<OrderIdParamInput, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const OrderID = Number(req.params.id);

    const order = await getOrderByID(OrderID);
    return res.status(200).json({ status: "success", data: order });
  } catch (error) {
    return next(error);
  }
};

export const updateOrderHandler = async (
  req: Request<OrderIdParamInput, {}, OrderUpdateInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderID = +req.params.id;

    const updatedOrder = await updateOrder(orderID, req.body);
    return res.status(200).json({ status: "success", data: updatedOrder });
  } catch (error) {
    return next(error);
  }
};
