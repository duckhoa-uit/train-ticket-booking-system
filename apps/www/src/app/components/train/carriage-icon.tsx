// import { Carriage } from "@/types";
import Image from "next/image";
import React from "react";

import { cn } from "@ttbs/lib/cn";
import type { Carriage as CarriageType, SeatType } from "@ttbs/prisma";
import { Tooltip } from "@ttbs/ui";

type CarriageIconProps = {
  carriage?: CarriageType & { seatType: SeatType };
  selected?: boolean;
  isFull?: boolean;
  onClick?: () => void;
};
export const CarriageIcon = ({ carriage, selected = false, isFull = false, onClick }: CarriageIconProps) => {
  const TrainIconComp = () => (
    <div className="relative h-7 w-[50px] cursor-pointer" onClick={onClick}>
      <div
        className={cn(
          "absolute top-0 h-5 w-full rounded-md bg-[#80b5d6] hover:to-blue-600 focus:bg-green-400",
          selected && "bg-[#a6b727]",
          isFull && "bg-red-600"
        )}
      />

      <Image
        src="/trainCar2.png"
        width={50}
        height={50}
        alt="train"
        className="absolute inset-x-0 top-0 w-full"
      />
    </div>
  );

  if (!carriage) return <TrainIconComp />;

  return (
    <Tooltip content={`${carriage.seatType.name} (${carriage.code})`}>
      <div className="text-center">
        <TrainIconComp />

        <p className="top-2">{carriage.name ?? ""}</p>
      </div>
    </Tooltip>
  );
};
