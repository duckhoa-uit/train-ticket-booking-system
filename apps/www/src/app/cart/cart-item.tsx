import { useQuery } from "@tanstack/react-query";
import React from "react";

import { env } from "@ttbs/env";
import { cn } from "@ttbs/lib/cn";
import type { Carriage, Seat, Trip, Station, Train, SeatType } from "@ttbs/prisma";
import { Button, SkeletonText } from "@ttbs/ui";
import { Trash2Icon } from "@ttbs/ui/components/icons";

import dayjs from "../lib/dayjs";
import { get } from "../lib/fetch";
import { useCart, type CartItem } from "./context";

type CartItemProps = {
  seat: CartItem;
};
const SelectedSeat = ({ seat }: CartItemProps) => {
  const {
    actions: { removeById },
  } = useCart();

  return (
    <div className="flex items-center py-2">
      <div className="flex-1">
        <SelectedSeatText seat={seat} />
      </div>
      <Button variant="icon" color="destructive" onClick={() => removeById(seat.id)}>
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const SelectedSeatText = ({ seat, className }: CartItemProps & { className?: string }) => {
  const { data: seatFullData } = useQuery({
    queryKey: ["seats", seat.id],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/seats/${seat.id}?departStationId=${seat.fromStationId}`
      );
      return res.data as Seat & {
        seatType: SeatType;
        carriage: Carriage;
        trip: Trip;
        train: Train;
        departTime?: string;
      };
    },
  });

  const { data: fromStation } = useQuery({
    queryKey: ["stations", seat.fromStationId],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations/${seat.fromStationId}`);
      return res.data as Station;
    },
  });
  const { data: toStation } = useQuery({
    queryKey: ["stations", seat.toStationId],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations/${seat.toStationId}`);
      return res.data as Station;
    },
  });

  return seatFullData && fromStation && toStation ? (
    <div className={cn("flex flex-col items-start", className)}>
      <p>{`${seatFullData.train.code} ${fromStation.name}-${toStation.name}`}</p>
      {seatFullData.departTime ? <p>{dayjs(seatFullData.departTime).format("L HH:mm")}</p> : null}
      {seatFullData.carriage ? <p>{`${seatFullData.carriage.name}, chỗ ${seatFullData.order}`}</p> : null}
    </div>
  ) : (
    <SkeletonText />
  );
};

export default SelectedSeat;
