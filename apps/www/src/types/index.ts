// enum CarriageStatus {
//   HAS_SEAT,
//   FULL,
// }
import type { Station, Train, Trip } from "@ttbs/prisma";

export type Seat = {
  order: number;
};

export type Carriage = {
  code?: string;
  name?: string;
  note?: string;
  //   status?: CarriageStatus;
  order?: number;
  numOfCabins?: number;
  seatsPerCabin?: number;
  seats?: Seat[];
};

// export type Train = {
//   carriages: Carriage[];
// };

export type TripApiResponse = Trip & {
  train: Train;
  timelines: Array<{ departDate: string; arrivalDate: string; station: Station }>;
};

// export type Ticket = {};
