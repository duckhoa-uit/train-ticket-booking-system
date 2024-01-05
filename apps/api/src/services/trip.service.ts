import dayjs from "@ttbs/lib/dayjs";
import prisma, { Prisma } from "@ttbs/prisma";

import {
  GetSeatsOnTripQueryInput,
  SearchTripQueryInput,
  TripCreateInput,
  TripUpdateInput,
} from "@/schemas/trip.schema";

export const createTrip = async (input: TripCreateInput) => {
  return prisma.$transaction(async (tx) => {
    const train = await prisma.train.findUniqueOrThrow({
      where: {
        id: input.trainId,
      },
      include: {
        carriages: {
          include: {
            seatType: true,
          },
        },
      },
    });

    const newTrip = await tx.trip.create({
      data: {
        name: input.name,
        journeyId: input.journeyId,
        trainId: input.trainId,
        arrivalDate: input.arrivalDate ?? input.timelines[0].arrivalDate,
        departDate:
          input.departDate ??
          input.timelines[input.timelines.length - 1].departDate,
        timelines: {
          createMany: {
            data: input.timelines.map((timeline) => ({
              journeyStationId: timeline.journeyStationId,
              arrivalDate: timeline.arrivalDate,
              departDate: timeline.departDate,
            })),
          },
        },
        seats: {
          createMany: {
            data: train.carriages.flatMap((c) =>
              Array.from({
                length: c.seatsPerCabin * (c.numOfCabins ?? 1),
              }).map((_, idx) => ({
                carriageId: c.id,
                order: idx + 1,
              })),
            ),
          },
        },
      },
    });

    const prices = input.timelines.flatMap<Prisma.PricingCreateManyInput>(
      (timeline) =>
        (timeline.prices ?? []).map((price) => ({
          ...price,
          tripId: newTrip.id,
        })),
    );

    await tx.pricing.createMany({
      data: prices,
    });

    return newTrip;
  });
};

export const getAllTrips = async (query: SearchTripQueryInput) => {
  const {
    departDate,
    skip,
    limit,
    departStationId,
    arrivalStationId,
    orderBy,
    timeRange,
  } = query;

  const [timeFrom, timeTo] = timeRange ? timeRange.split("-") : [];

  // const res = await prisma.pricing.groupBy({
  //   by: ["tripId"],
  //   skip,
  //   take: limit,
  //   orderBy: {
  //     tripId: "asc",
  //   },
  //   where: {
  //     trip: {
  //       timelines: {
  //         some: {
  //           departDate: {
  //             gte: dayjs(departDate).startOf("date").toDate(),
  //             lte: dayjs(departDate).endOf("date").toDate(),
  //           },
  //           journeyStation: {
  //             OR: [
  //               {
  //                 stationId: departStationId,
  //               },
  //               {
  //                 stationId: arrivalStationId,
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  // console.log("🚀 ~ file: trip.service.ts:72 ~ getAllTrips ~ res:", res);

  const trips = await prisma.trip.findMany({
    where: {
      ...(departStationId && arrivalStationId
        ? {
            timelines: {
              some: {
                ...(departDate
                  ? {
                      departDate: {
                        gte: timeFrom
                          ? dayjs(departDate)
                              .startOf("date")
                              .hour(+timeFrom.split(":")[0])
                              .minute(+timeFrom.split(":")[1])
                              .toDate()
                          : dayjs(departDate).startOf("date").toDate(),
                        lte: timeTo
                          ? dayjs(departDate)
                              .startOf("date")
                              .hour(+timeTo.split(":")[0])
                              .minute(+timeTo.split(":")[1])
                              .toDate()
                          : dayjs(departDate).endOf("date").toDate(),
                      },
                    }
                  : {}),
                // FIXME: bug here, have not filter by order yet
                journeyStation: {
                  OR: [
                    {
                      stationId: departStationId,
                    },
                    {
                      stationId: arrivalStationId,
                    },
                  ],
                },
              },
            },
          }
        : {}),
    },
    skip,
    take: limit,
    ...(orderBy
      ? {
          orderBy: {
            departDate: orderBy === "departDate|asc" ? "asc" : "desc",
          },
        }
      : {}),
    include: {
      train: true,
      timelines: {
        include: {
          journeyStation: {
            include: {
              station: true,
            },
          },
        },
      },
      journey: true,
    },
  });

  const modifiedTrips = trips.map(({ timelines, ...tripWithoutTimelines }) => {
    const _timelines = timelines.map(
      ({ departDate, arrivalDate, journeyStation: { station } }) => ({
        departDate,
        arrivalDate,
        station,
      }),
    );

    return {
      ...tripWithoutTimelines,
      timelines: _timelines,
    };
  });

  return {
    trips: modifiedTrips,
    count: await prisma.trip.count({
      where: {
        timelines: {
          some: {
            departDate: {
              gte: timeFrom
                ? dayjs(departDate)
                    .startOf("date")
                    .hour(+timeFrom.split(":")[0])
                    .minute(+timeFrom.split(":")[1])
                    .toDate()
                : dayjs(departDate).startOf("date").toDate(),
              lte: timeTo
                ? dayjs(departDate)
                    .startOf("date")
                    .hour(+timeTo.split(":")[0])
                    .minute(+timeTo.split(":")[1])
                    .toDate()
                : dayjs(departDate).endOf("date").toDate(),
            },
            // FIXME: bug here, have not filter by order yet
            journeyStation: {
              OR: [
                {
                  stationId: departStationId,
                },
                {
                  stationId: arrivalStationId,
                },
              ],
            },
          },
        },
      },
    }),
  };
};

export const getTripByID = async (id: number) => {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      train: {
        include: {
          carriages: {
            include: { seatType: true },
          },
        },
      },
      journey: true,
      timelines: {
        include: {
          journeyStation: {
            include: {
              station: true,
            },
          },
        },
      },
    },
  });

  const { timelines, ...tripWithoutTimelines } = trip ?? {};
  const _timelines = (timelines ?? []).map(
    ({ departDate, arrivalDate, journeyStation: { station } }) => ({
      departDate,
      arrivalDate,
      station,
    }),
  );

  return {
    ...tripWithoutTimelines,
    timelines: _timelines,
  };
};

export const updateTrip = async (id: number, input: TripUpdateInput) => {
  const existTrip = await prisma.trip.findUnique({
    where: { id },
  });
  if (!existTrip) return null;

  return await prisma.trip.update({
    where: { id },
    data: {
      name: input.name,
      journeyId: input.journeyId,
      trainId: input.trainId,
      arrivalDate: input.arrivalDate,
      departDate: input.departDate,
    },
  });
};

export const getSeatsOnTripById = async (
  tripId: number,
  query: GetSeatsOnTripQueryInput,
) => {
  // TODO: update function for seat statsu
  const { carriageId } = query;

  const seats = await prisma.seat.findMany({
    where: {
      tripId,
      carriageId,
    },
  });

  return seats;
};

export const getPricesOnTrip = async ({
  tripId,
  seatTypeId,
  arrivalStationId,
  departStationId,
}: {
  tripId: number;
  seatTypeId: number;
  arrivalStationId: number;
  departStationId: number;
}) => {
  const trip = await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
    include: {
      timelines: {
        include: {
          journeyStation: {
            include: {
              station: true,
            },
          },
        },
      },
    },
  });

  const stationIds = trip.timelines
    .map((t) => t.journeyStation)
    .sort((a, b) => a.order - b.order)
    .map((j) => j.stationId);
  const fromStationIdx = stationIds.findIndex((id) => id === departStationId);
  const toStationIdx = stationIds.findIndex((id) => id === arrivalStationId);
  const stationIdsRange = stationIds.slice(fromStationIdx, toStationIdx + 1);
  const lastStation = stationIdsRange.pop();

  const prices = await prisma.pricing.findMany({
    where: {
      tripId,
      seatTypeId,
      OR: [
        { departStationId: { in: stationIdsRange } },
        { arrivalStationId: lastStation },
      ],
    },
  });

  return prices.reduce((prev, curr) => prev + curr.amount, 0);
};
