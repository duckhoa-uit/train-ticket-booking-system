import dayjs from "@ttbs/lib/dayjs";
import prisma, { Prisma } from "@ttbs/prisma";

import {
  GetStatisticOrdersTimelineQueryInput,
  GetStatisticPopularJourneysQueryInput,
  GetStatisticSummaryQueryInput,
} from "@/schemas/statistic.schema";
import { getPercentage } from "@/utils/calculate";
import {
  getCancelledOrdersInTimeRange,
  getCompletedOrdersInTimeRange,
  getCreatedOrdersInTimeRange,
  getPendingOrdersInTimeRange,
} from "@/utils/statistic";
import { getTimeLine } from "@/utils/timeline";

const emptyResponseEventsByStatus = {
  empty: true,
  created: {
    count: 0,
    deltaPrevious: 0,
  },
  completed: {
    count: 0,
    deltaPrevious: 0,
  },
  pending: {
    count: 0,
    deltaPrevious: 0,
  },
  cancelled: {
    count: 0,
    deltaPrevious: 0,
  },
  previousRange: {
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
  },
};

export const getStatisticSummary = async ({ startDate, endDate }: GetStatisticSummaryQueryInput) => {
  const whereConditional: Prisma.OrderWhereInput = {};

  const baseWhereCondition = {
    ...whereConditional,
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  };
  const baseOrdersCount = await prisma.order.count({ where: baseWhereCondition });

  const startTimeEndTimeDiff = dayjs(endDate).diff(dayjs(startDate), "day");

  const lastPeriodStartDate = dayjs(startDate).subtract(startTimeEndTimeDiff, "day");
  const lastPeriodEndDate = dayjs(endDate).subtract(startTimeEndTimeDiff, "day");

  const lastPeriodBaseCondition = {
    ...whereConditional,
    createdAt: {
      gte: lastPeriodStartDate.toDate(),
      lte: lastPeriodEndDate.toDate(),
    },
  };

  const totalCompleted = await prisma.order.count({
    where: {
      ...baseWhereCondition,
      paymentStatus: "PAID",
    },
  });

  const totalCancelled = await prisma.order.count({
    where: {
      ...baseWhereCondition,
      paymentStatus: "CANCELED",
    },
  });
  const totalPending = await prisma.order.count({
    where: {
      ...baseWhereCondition,
      paymentStatus: "PENDING",
    },
  });

  const lastPeriodBaseOrdersCount = await prisma.order.count({
    where: lastPeriodBaseCondition,
  });

  const lastPeriodTotalCancelled = await prisma.order.count({
    where: {
      ...lastPeriodBaseCondition,
      paymentStatus: "CANCELED",
    },
  });
  const lastPeriodTotalPending = await prisma.order.count({
    where: {
      ...lastPeriodBaseCondition,
      paymentStatus: "PENDING",
    },
  });

  const result = {
    empty: false,
    created: {
      count: baseOrdersCount,
      deltaPrevious: getPercentage(baseOrdersCount, lastPeriodBaseOrdersCount),
    },
    completed: {
      count: totalCompleted,
      deltaPrevious: getPercentage(
        baseOrdersCount - totalCancelled - totalPending,
        lastPeriodBaseOrdersCount - lastPeriodTotalCancelled - lastPeriodTotalPending
      ),
    },
    pending: {
      count: totalPending,
      deltaPrevious: getPercentage(totalPending, lastPeriodTotalPending),
    },
    cancelled: {
      count: totalCancelled,
      deltaPrevious: getPercentage(totalCancelled, lastPeriodTotalCancelled),
    },
    previousRange: {
      startDate: lastPeriodStartDate.format("YYYY-MM-DD"),
      endDate: lastPeriodEndDate.format("YYYY-MM-DD"),
    },
  };
  console.log(
    "🚀 ~ file: statistic.service.ts:130 ~ getStatisticSummary ~ result.completed.baseOrdersCount:",
    baseOrdersCount - totalCancelled - totalPending,
    lastPeriodBaseOrdersCount - lastPeriodTotalCancelled - lastPeriodTotalPending
  );

  if (
    result.created.count === 0 &&
    result.completed.count === 0 &&
    result.pending.count === 0 &&
    result.cancelled.count === 0
  ) {
    return emptyResponseEventsByStatus;
  }

  return result;
};

export const getStatisticOrdersTimeline = async ({
  startDate: inputStartDate,
  endDate: inputEndDate,
  timeView: inputTimeView,
}: GetStatisticOrdersTimelineQueryInput) => {
  const startDate = dayjs(inputStartDate);
  const endDate = dayjs(inputEndDate);

  let timeView: "day" | "month" | "year" | "week" = inputTimeView;

  if (timeView === "week") {
    // Difference between start and end date is less than 14 days use day view
    if (endDate.diff(startDate, "day") < 14) {
      timeView = "day";
    }
  }

  const whereConditional: Prisma.OrderWhereInput = {};

  // Get timeline data
  const timeline = await getTimeLine(timeView, dayjs(startDate), dayjs(endDate));

  // iterate timeline and fetch data
  if (!timeline) {
    return [];
  }

  const dateFormat: string = timeView === "year" ? "YYYY" : timeView === "month" ? "MMM YYYY" : "ll";
  const result = [];

  for (const date of timeline) {
    const EventData = {
      Month: dayjs(date).format(dateFormat),
      Created: 0,
      Completed: 0,
      Pending: 0,
      Cancelled: 0,
    };

    const startOfEndOf = timeView;
    let startDate = dayjs(date).startOf(startOfEndOf);
    let endDate = dayjs(date).endOf(startOfEndOf);
    if (timeView === "week") {
      startDate = dayjs(date).startOf("day");
      endDate = dayjs(date).add(6, "day").endOf("day");
    }
    const promisesResult = await Promise.all([
      getCreatedOrdersInTimeRange(
        {
          start: startDate,
          end: endDate,
        },
        whereConditional
      ),
      getCompletedOrdersInTimeRange(
        {
          start: startDate,
          end: endDate,
        },
        whereConditional
      ),
      getPendingOrdersInTimeRange(
        {
          start: startDate,
          end: endDate,
        },
        whereConditional
      ),
      getCancelledOrdersInTimeRange(
        {
          start: startDate,
          end: endDate,
        },
        whereConditional
      ),
    ]);

    EventData["Created"] = promisesResult[0];
    EventData["Completed"] = promisesResult[1];
    EventData["Pending"] = promisesResult[2];
    EventData["Cancelled"] = promisesResult[3];
    result.push(EventData);
  }

  return result;
};

export const getStatisticPopularJourneys = async ({
  startDate,
  endDate,
}: GetStatisticPopularJourneysQueryInput) => {
  const ticketWhere: Prisma.TicketWhereInput = {
    order: {
      paymentStatus: "PAID",
    },
    createdAt: {
      gte: dayjs(startDate).startOf("day").toDate(),
      lte: dayjs(endDate).endOf("day").toDate(),
    },
  };

  // const bookingsFromSelected = await prisma.ticket.groupBy({
  //   by: [""],
  //   where: ticketWhere,
  //   _count: {
  //     id: true,
  //   },
  //   orderBy: {
  //     _count: {
  //       id: "desc",
  //     },
  //   },
  //   take: 10,
  // });

  // const eventTypeIds = bookingsFromSelected
  //   .filter((booking) => typeof booking.eventTypeId === "number")
  //   .map((booking) => booking.eventTypeId);

  // const eventTypeWhereConditional: Prisma.JourneyWhereInput = {
  //   id: {
  //     in: eventTypeIds as number[],
  //   },
  // };

  // const journeysFrom = await prisma.journey.findMany({
  //   select: {
  //     id: true,
  //     name: true
  //   },
  //   where: eventTypeWhereConditional,
  // });

  // const journeyHashMap: Map<
  //   number,
  //   Prisma.JourneyGetPayload<{
  //     select: {
  //       id: true;
  //       name: true;
  //     };
  //   }>
  // > = new Map();

  // journeysFrom.forEach((journey) => {
  //   journeyHashMap.set(journey.id, journey);
  // });

  // const result = bookingsFromSelected.map((booking) => {
  //   const eventTypeSelected = journeyHashMap.get(booking.eventTypeId ?? 0);
  //   if (!eventTypeSelected) {
  //     return {};
  //   }

  //   let eventSlug = "";
  //   if (eventTypeSelected.userId) {
  //     eventSlug = `${eventTypeSelected?.users[0]?.username}/${eventTypeSelected?.slug}`;
  //   }
  //   if (eventTypeSelected?.team && eventTypeSelected?.team?.slug) {
  //     eventSlug = `${eventTypeSelected.team.slug}/${eventTypeSelected.slug}`;
  //   }
  //   return {
  //     eventTypeId: booking.eventTypeId,
  //     eventTypeName: eventSlug,
  //     count: booking._count.id,
  //   };
  // });

  // return result;

  return ticketWhere;
};
