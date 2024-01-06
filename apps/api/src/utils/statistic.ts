import dayjs from "@ttbs/lib/dayjs";
import prisma, { Prisma } from "@ttbs/prisma";

interface ITimeRange {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
}
const getOrdersInTimeRange = async (
  timeRange: ITimeRange,
  where: Prisma.OrderWhereInput,
) => {
  const { start, end } = timeRange;

  const orders = await prisma.order.count({
    where: {
      ...where,
      createdAt: {
        gte: start.toISOString(),
        lte: end.toISOString(),
      },
    },
  });

  return orders;
};

export const getCreatedOrdersInTimeRange = async (
  timeRange: ITimeRange,
  where: Prisma.OrderWhereInput,
) => {
  const result = await getOrdersInTimeRange(timeRange, where);

  return result;
};

export const getCancelledOrdersInTimeRange = async (
  timeRange: ITimeRange,
  where: Prisma.OrderWhereInput,
) => {
  const result = await getOrdersInTimeRange(timeRange, {
    ...where,
    paymentStatus: "CANCELED",
  });

  return result;
};

export const getCompletedOrdersInTimeRange = async (
  timeRange: ITimeRange,
  where: Prisma.OrderWhereInput,
) => {
  const result = await getOrdersInTimeRange(timeRange, {
    ...where,
    paymentStatus: "PAID",
  });

  return result;
};

export const getPendingOrdersInTimeRange = async (
  timeRange: ITimeRange,
  where: Prisma.OrderWhereInput,
) => {
  const result = await getOrdersInTimeRange(timeRange, {
    ...where,
    paymentStatus: "PENDING",
  });

  return result;
};
