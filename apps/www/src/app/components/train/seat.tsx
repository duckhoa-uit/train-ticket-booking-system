import React, { useMemo } from "react";

import { cn } from "@ttbs/lib/cn";
import type { Seat } from "@ttbs/prisma";
import { Button, SkeletonText, Tooltip } from "@ttbs/ui";

import { useCart } from "@/app/cart/context";
import { currencyFormatter } from "@/utils/currency";

export type SeatInTrip = Seat & { status: "bought" | "free" };

type SeatButtonProps = {
  seat?: Seat;
  status?: "bought" | "free";
  selected?: boolean;
  hideContent?: boolean;
  price?: number;
  onClick?: () => void;
};
export const SeatButton = ({
  price,
  status = "free",
  selected = false,
  hideContent = false,
  seat,
  onClick,
}: SeatButtonProps) => {
  const { lineItems } = useCart();
  const _selected = useMemo(() => {
    if (selected) return selected;

    if (!seat) return false;

    const ids = lineItems.map((_) => _.id);
    return ids.includes(seat.id);
  }, [lineItems, seat, selected]);

  return (
    <Tooltip
      content={
        status === "bought" ? "Đã bán" : !price ? "loading..." : `Giá: ${currencyFormatter.format(price)}`
      }
    >
      <Button
        color="secondary"
        variant="icon"
        disabled={status === "bought"}
        className={cn("h-9 w-9", _selected && "bg-brand-default text-inverted hover:bg-brand-emphasis")}
        onClick={onClick}
      >
        {hideContent ? null : !seat ? <SkeletonText className="h-4 w-4" /> : <>{seat.order}</>}
      </Button>
    </Tooltip>
  );
};
