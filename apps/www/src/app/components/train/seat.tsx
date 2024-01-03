import React, { useMemo } from "react";

import { cn } from "@ttbs/lib/cn";
import type { Seat } from "@ttbs/prisma";
import { Button, SkeletonText, Tooltip } from "@ttbs/ui";

import { useCart } from "@/app/cart/context";
import { currencyFormatter } from "@/utils/currency";

type SeatButtonProps = {
  seat?: Seat;
  price?: number;
  onClick?: () => void;
};
export const SeatButton = ({ price, seat, onClick }: SeatButtonProps) => {
  const { lineItems } = useCart();
  const selected = useMemo(() => {
    if (!seat) return false;

    const ids = lineItems.map((_) => _.id);
    return ids.includes(seat.id);
  }, [lineItems, seat]);

  return (
    <Tooltip content={!price ? "loading..." : `Giá: ${currencyFormatter.format(price)}`}>
      <Button
        color="secondary"
        variant="icon"
        className={cn("h-9 w-9", selected && "bg-brand-default text-inverted hover:bg-brand-emphasis")}
        onClick={onClick}
      >
        {!seat ? <SkeletonText className="h-4 w-4" /> : <>{seat.order}</>}
      </Button>
    </Tooltip>
  );
};
