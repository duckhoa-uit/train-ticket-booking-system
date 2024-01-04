export const INIT_JOURNEYS = [
  {
    name: "Sài Gòn tới Hà Nội",
    journeyStations: [
      {
        stationId: 1,
        order: 1,
      },
      {
        stationId: 12,
        order: 2,
      },
      {
        stationId: 13,
        order: 3,
      },
      {
        stationId: 2,
        order: 4,
      },
    ],
    trips: [
      {
        name: "Sài Gòn - Hà Nội",
        trainId: 1,
      },
    ],
  },
] as const;
