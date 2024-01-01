// enum CarriageStatus {
//   HAS_SEAT,
//   FULL,
// }
import type { Carriage, SeatType, Station, Train, Trip } from "@ttbs/prisma";

export type SearchTripItemApiResponse = Trip & {
  train: Train & { carriages: Array<Carriage & { seatType: SeatType }> };
  timelines: Array<{
    departDate: string;
    arrivalDate: string;
    station: Station;
  }>;
};

// export type Ticket = {};
