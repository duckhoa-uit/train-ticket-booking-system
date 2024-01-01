import React from "react";

import type { Seat } from "@ttbs/prisma";
import { Button, SkeletonText, Tooltip } from "@ttbs/ui";

import { currencyFormatter } from "@/utils/currency";

type SeatButtonProps = {
  seat?: Seat;
  price?: number;
};
export const SeatButton = ({ price, seat }: SeatButtonProps) => {
  return (
    <Tooltip
      content={
        !price ? "loading..." : `Giá: ${currencyFormatter.format(price)}`
      }
    >
      <Button color="secondary" variant="icon" className="h-9 w-9">
        {!seat ? <SkeletonText className="h-4 w-4" /> : <>{seat.order}</>}
      </Button>
    </Tooltip>
  );
};
