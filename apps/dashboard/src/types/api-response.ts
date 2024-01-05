import type {
  Carriage,
  Journey,
  JourneyStation,
  Pricing,
  SeatType,
  Station,
  Train,
  Trip,
} from "@ttbs/prisma";

export type TrainItemDetailsApiResponse = Train & { carriages: Array<Carriage & { seatType: SeatType }> };

export type TripItemDetailsApiResponse = Trip & {
  train: TrainItemDetailsApiResponse;
  pricings: Pricing[];
  timelines: Array<{
    journeyStation: JourneyStation;
    departDate: string;
    arrivalDate: string;
    station: Station;
  }>;
};

export type JourneyItemDetailsApiResponse = Journey & {
  journeyStations: Array<JourneyStation & { station: Station }>;
};
