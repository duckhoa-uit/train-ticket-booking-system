// enum CarriageStatus {
//   HAS_SEAT,
//   FULL,
// }

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

export type Train = {
  carriages: Carriage[];
};

// export type Ticket = {};
