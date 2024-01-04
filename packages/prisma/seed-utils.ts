import { INITIAL_STATIONS, INIT_SEATTYPES, INIT_TRAINS, INIT_JOURNEYS } from "@ttbs/lib/constants";
import { hashPassword } from "@ttbs/lib/password";

import prisma from ".";
import type { UserRole } from "./enums";

export async function createUser({
  user,
}: {
  user: {
    email: string;
    password: string;
    username: string;
    name: string;
    role?: UserRole;
  };
}) {
  const userData = {
    ...user,
    password: await hashPassword(user.password),
    emailVerified: new Date(),
  };

  const theUser = await prisma.user.upsert({
    where: { email: user.email },
    update: userData,
    create: userData,
  });

  console.log(`👤 Upserted '${user.username}' with email "${user.email}" & password "${user.password}".`);

  return theUser;
}

export async function createStations() {
  const { count } = await prisma.station.createMany({
    data: INITIAL_STATIONS.map((station) => ({
      code: station.code,
      name: station.name,
    })),
    skipDuplicates: false,
  });

  console.log(`🚉 Created ${count} stations crawled from vetautructuyen.vn`);
}

export async function createSeatTypes() {
  const { count } = await prisma.seatType.createMany({
    data: INIT_SEATTYPES.map((seatType) => ({
      floors: seatType.floors,
      seatsPerRow: seatType.seatsPerRow,
      name: seatType.name,
    })),
    skipDuplicates: false,
  });

  console.log(`🪑 Created ${count} seat types.`);
}

export async function createTrains() {
  return await Promise.all(
    INIT_TRAINS.map(async (train) => {
      const { code, name, carriages } = train;

      const createdTrain = await prisma.train.create({
        data: {
          code,
          name,
          carriages: {
            createMany: {
              data: carriages.map((carriage) => ({
                code: carriage.code,
                name: carriage.name,
                order: carriage.order,
                seatsPerCabin: carriage.seatsPerCabin,
                seatTypeId: carriage.seatTypeId,
              })),
            },
          },
        },
      });

      console.log(`🚂 Created train ${createdTrain.code} (${createdTrain.name})`);
    })
  );
}

export async function createJourneys() {
  return await Promise.all(
    INIT_JOURNEYS.map(async (journey) => {
      const { name, journeyStations, trips } = journey;

      const createdJourney = await prisma.journey.create({
        data: {
          name,
          journeyStations: {
            createMany: {
              data: journeyStations.map((journeyStation) => ({
                order: journeyStation.order,
                stationId: journeyStation.stationId,
              })),
            },
          },
          trips: {
            createMany: {
              data: trips.map((trip) => ({
                name: trip.name,
                trainId: trip.trainId,
                arrivalDate: new Date("2024-01-01T08:00:00Z"),
                departDate: new Date("2024-01-01T16:00:00Z"),
              })),
            },
          },
        },
      });

      console.log(`🚄 Created journey ${createdJourney.name}`);
    })
  );
}
