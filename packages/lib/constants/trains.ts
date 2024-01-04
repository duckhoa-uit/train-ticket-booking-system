export const INIT_TRAINS = [
  {
    code: "DX1",
    name: "EXPRESS247",
    carriages: [
      {
        code: "CAR1",
        name: "CARRIAGE 1",
        seatTypeId: 1,
        order: 1,
        seatsPerCabin: 6,
      },
      {
        code: "CAR2",
        name: "CARRIAGE 2",
        seatTypeId: 2,
        order: 2,
        seatsPerCabin: 3,
      },
      {
        code: "CAR3",
        name: "CARRIAGE 3",
        seatTypeId: 1,
        order: 3,
        seatsPerCabin: 8,
      },
      {
        code: "CAR4",
        name: "CARRIAGE 4",
        seatTypeId: 1,
        order: 4,
        seatsPerCabin: 4,
      },
    ],
  },
] as const;
