export const INIT_TRIPS = [
  {
    name: "Sàn Gòn - Hà Nội",
    journeyId: 1,
    trainId: 1,
    timelines: [
      {
        journeyStationId: 1,
      },
      {
        journeyStationId: 2,
      },
      {
        journeyStationId: 3,
      },
      {
        journeyStationId: 4,
      },
    ],
    pricings: [
      {
        seatTypeId: 1,
        departStationId: 1,
        arrivalStationId: 2,
        amount: 1200000,
      },
      {
        seatTypeId: 2,
        departStationId: 1,
        arrivalStationId: 2,
        amount: 1800000,
      },
    ],
  },
] as const;
