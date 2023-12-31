import Image from "next/image";
import React from "react";

import type { SearchTripItemApiResponse } from "@/types";

import { CarriageIcon } from ".";

type TrainVisualizationProps = {
  train: SearchTripItemApiResponse["train"];
  selectedCarriageId?: number;
  onChangeCarriage: (id: number) => void;
};
export const TrainVisualization = ({
  train,
  selectedCarriageId,
  onChangeCarriage,
}: TrainVisualizationProps) => {
  return (
    <div className="flex gap-2">
      {train.carriages
        .sort((a, b) => b.order - a.order)
        .map((carriage) => (
          <CarriageIcon
            onClick={() => onChangeCarriage(carriage.id)}
            selected={selectedCarriageId === carriage.id}
            carriage={carriage}
            key={carriage.code}
          />
        ))}

      <Image className="h-max" src="/train2.png" width={50} height={27.7} alt="train-head" />
    </div>
  );
};
