import { NextFunction, Request, Response } from "express";

import { OrderCreateInput, OrderIdParamInput, OrderUpdateInput } from "@/schemas/order.schema";
import { createOrder, getAllOrders, getOrderByID, updateOrder } from "@/services/order.service";

export const createOrderHandler = async (
  req: Request<{}, {}, OrderCreateInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOrder = await createOrder(req.body);
    return res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    return next(error);
  }
};

export const getOrderHandler = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
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
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const orderID = +req.params.id;

    const updatedOrder = await updateOrder(orderID, req.body);
    return res.status(200).json({ status: "success", data: updatedOrder });
  } catch (error) {
    return next(error);
  }
};
