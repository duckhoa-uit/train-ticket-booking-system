// import { Carriage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { env } from "@ttbs/env";
import type { Carriage as CarriageType, Seat, SeatType } from "@ttbs/prisma";

import { get } from "@/app/lib/fetch";

import { SeatButton } from "./seat";

type CarriageWithSeatsProps = {
  price?: number;
  tripId: number;
  carriage: CarriageType & { seatType: SeatType };
};
export const CarriageWithSeats = ({ carriage, tripId, price }: CarriageWithSeatsProps) => {
  const floors = carriage.seatType.floors;
  const numOfCabins = carriage.numOfCabins ?? 1;
  const seatsPerRow = carriage.seatType.seatsPerRow;
  const numOfRows = Math.round((carriage.seatsPerCabin * numOfCabins) / seatsPerRow);

  const { data: seatsAsObject = {} } = useQuery({
    queryKey: ["seats", tripId, carriage],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trips/${tripId}/carriages/${carriage?.id}/seats`
      );
      const seats = res.data as Seat[];
      return seats.reduce<Record<number, Seat>>(
        (prev, curr) => ({
          ...prev,
          [curr.order]: curr,
        }),
        {}
      );
    },
    enabled: !!carriage,
  });

  return (
    <div className="border-subtle w-full border p-4">
      <div className="mx-auto flex w-fit items-center gap-3">
        <div className="flex flex-col gap-2">
          {floors > 1 &&
            Array.from({ length: floors }).map((_, idx) => (
              <div className="flex-1 items-center" key={`CC_${idx}`}>
                <span>{`Tầng ${floors - idx}`}</span>
              </div>
            ))}
        </div>
        <div className={`grid gap-3 grid-cols-${numOfCabins}`}>
          {Array.from({ length: numOfCabins }).map((_, cabinIdx) => (
            /**
             * Render cabins
             */
            <div className="col-span-1 flex h-full w-fit flex-col gap-2" key={cabinIdx}>
              {numOfCabins > 1 ? <span className="text-center">{`Khoang ${cabinIdx + 1}`}</span> : null}
              <div className="flex gap-3">
                {Array.from({
                  length: numOfRows / numOfCabins,
                }).map((_, row) => (
                  /**
                   * Render rows in each cabin
                   */
                  <div key={row} className="flex flex-col gap-2">
                    {Array.from({ length: seatsPerRow }).map((_, idx) => {
                      /**
                       * Render Seat
                       */
                      const order = cabinIdx * carriage.seatsPerCabin + seatsPerRow * row + (idx + 1);
                      return <SeatButton price={price} key={`${row}_${idx}`} seat={seatsAsObject[order]} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
