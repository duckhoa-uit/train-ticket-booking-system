import Link from "next/link";
import React from "react";

import { cn } from "@ttbs/lib/cn";
import { Card } from "@ttbs/ui";

type Props = {
  className?: string;
};

export const TripItem = ({ className }: Props) => {
  const des = `
    Thời gian đi: 16:30 p.m | 22/10 
  `;
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-emphasis bg-default hidden w-full rounded-md border p-10 md:flex md:items-center md:justify-between",
          "hover:bg-muted hover:cursor-pointer hover:shadow-sm",
          className
        )}
      >
        <div className="text-sm md:text-xl">
          <p>SE8</p>
        </div>
        <div className="flex items-center justify-around gap-10 text-center">
          <div>
            <p>16:30 p.m</p>
            <p>Sài gòn</p>
            <p>CN, 22/10/2023</p>
          </div>
          <div>
            <div className="h-[1px] w-full bg-black" />
            <Link className="text-attention" href="/train-detail">
              Xem tuyến
            </Link>
          </div>
          <div>
            <p>16:30 p.m</p>
            <p>Sài gòn</p>
            <p>CN, 22/10/2023</p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "border-emphasis bg-default w-full rounded-md border p-4 md:hidden",
          "hover:bg-muted hover:shadow-sm"
        )}
      >
        <Card
          containerProps={{ className: `text-black` }}
          title="SE8 | Sài Gòn -> Sài Gòn"
          variant="basic"
          structure="card"
          description={`${des}`}
          actionButton={{ child: "Đặt chỗ", href: "#" }}
        />
      </div>
    </div>
  );
};
