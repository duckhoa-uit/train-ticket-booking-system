"use client";

import React from "react";

import { useTypedQuery } from "@ttbs/lib";
import { cn } from "@ttbs/lib/cn";
import { Button, Card, CardContent, CardFooter, CardHeader } from "@ttbs/ui";
import { ClockIcon, ExternalLinkIcon } from "@ttbs/ui/components/icons";

import dayjs from "@/app/lib/dayjs";
import { searchTripsQuerySchema } from "@/app/search/query-schema";
import type { TripApiResponse } from "@/types";

import ViewRoutesButton from "./view-routes-button";

type TripCardProps = {
  className?: string;
  trip: TripApiResponse;
};

export const TripCard = ({ className, trip }: TripCardProps) => {
  const {
    data: { arrivalStation: arrivalStationId, departStation: departStationId },
  } = useTypedQuery(searchTripsQuerySchema);
  const { train, timelines } = trip;

  const departStation = timelines.find((t) => t.station.id === departStationId);
  const arrivalStation = timelines.find((t) => t.station.id === arrivalStationId);

  const duration = dayjs.duration(dayjs(arrivalStation?.arrivalDate).diff(dayjs(departStation?.departDate)));

  return (
    <div className={cn("relative w-full", className)}>
      <Card className="bg-default hover:bg-muted block w-full hover:cursor-pointer hover:shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{train.name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-semibold">{dayjs(departStation?.departDate).format("HH:mm")}</h3>
              <div className="flex flex-col">
                <p className="font-medium">{departStation?.station.name}</p>
                <p className="text-sm text-gray-500">{dayjs(departStation?.departDate).format("LL")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="text-muted h-5 w-5" />
              <p className="font-medium">
                Thời gian di chuyển dự tính:{" "}
                {`${Math.round(duration.asHours())}h ${Math.round(
                  duration.subtract(Math.round(duration.asHours()), "hours").asMinutes()
                )}p`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-semibold">{dayjs(arrivalStation?.arrivalDate).format("HH:mm")}</h3>
              <div className="flex flex-col">
                <p className="font-medium">{arrivalStation?.station.name}</p>
                <p className="text-sm text-gray-500">{dayjs(arrivalStation?.arrivalDate).format("LL")}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <ViewRoutesButton tripId={trip.id} />
          <Button StartIcon={ExternalLinkIcon}>Chi tiết</Button>
        </CardFooter>
      </Card>

      {/* <InformationCard
        containerProps={{
          className: "border-subtle bg-default w-full rounded-md border p-4 md:hidden",
        }}
        title="SE8 | Sài Gòn -> Sài Gòn"
        variant="basic"
        structure="card"
        description="{des}"
        actionButton={{ child: "Đặt chỗ", href: "#" }}
      /> */}
    </div>
  );
};
