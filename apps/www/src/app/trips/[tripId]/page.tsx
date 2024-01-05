"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useMemo } from "react";

import { env } from "@ttbs/env";
import { useTypedQuery } from "@ttbs/lib";
import { cn } from "@ttbs/lib/cn";
import dayjs from "@ttbs/lib/dayjs";
import type { Carriage, SeatType, Station } from "@ttbs/prisma";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  VerticalDivider,
} from "@ttbs/ui";
import { SkeletonText } from "@ttbs/ui";
import { TicketIcon } from "@ttbs/ui/components/icons";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

import SelectedSeat from "@/app/cart/cart-item";
import { useCart } from "@/app/cart/context";
import {
  CarriageIcon,
  TrainVisualization,
  CarriageWithSeats,
  SeatButton,
} from "@/app/components/train";
import { get } from "@/app/lib/fetch";
import type { SearchTripItemApiResponse } from "@/types";

import { tripDetailsQuerySchema } from "./query-schema";

type TripDetailsPageProps = {
  params: {
    tripId: string;
  };
};

const TripDetails = ({ params: { tripId } }: TripDetailsPageProps) => {
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  const { lineItems } = useCart();

  const [selectedCarriage, setSelectedCarriage] = useState<
    (Carriage & { seatType: SeatType }) | null
  >(null);

  const {
    data: {
      carriageId,
      arrivalStation: arrivalStationId,
      date: departDate,
      departStation: departStationId,
    },
    setQuery,
  } = useTypedQuery(tripDetailsQuerySchema);

  const { data: stations } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations`);
      return res.data as Station[];
    },
  });

  const departPlace = useMemo(() => {
    return stations?.find(({ id }) => id === departStationId);
  }, [departStationId, stations]);

  const arrivalPlace = useMemo(() => {
    return stations?.find((s) => s.id === arrivalStationId);
  }, [arrivalStationId, stations]);

  const { data: trip } = useQuery({
    queryKey: ["trips", tripId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trips/${tripId}`,
      );
      return res.data as SearchTripItemApiResponse;
    },
  });

  const { data: price } = useQuery({
    queryKey: [
      "price",
      tripId,
      selectedCarriage,
      departStationId,
      arrivalStationId,
    ],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        departStationId: `${departStationId}`,
        arrivalStationId: `${arrivalStationId}`,
        seatTypeId: `${selectedCarriage?.seatTypeId}`,
      });
      const res = await get(
        `${
          env.NEXT_PUBLIC_API_BASE_URI
        }/api/trips/${tripId}/prices?${searchParams.toString()}`,
      );
      return res.data as number;
    },
    enabled: !!selectedCarriage,
  });

  useEffect(() => {
    if (trip) {
      if (!carriageId) {
        setQuery(
          "carriageId",
          trip.train.carriages.find(({ order }) => order === 1)?.id ??
            trip.train.carriages[0].id,
        );
      } else {
        setSelectedCarriage(
          trip.train.carriages.find(({ id }) => id === carriageId) ?? null,
        );
      }
    }
  }, [trip, carriageId]);

  return (
    <div
      className={cn(
        "md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl p-5 text-sm md:mt-10",
      )}
    >
      <Card className="bg-default block w-full">
        <CardHeader>
          <div className="flex flex-col items-center justify-start text-xl md:flex-row">
            <h2 className="">
              {!departPlace ? (
                <SkeletonText className="h-6 w-20 align-middle" />
              ) : (
                departPlace.name
              )}{" "}
              đến{" "}
              {!arrivalPlace ? (
                <SkeletonText className="h-6 w-20 align-middle" />
              ) : (
                arrivalPlace.name
              )}
            </h2>
            <VerticalDivider className="hidden md:block" />
            <span>
              {departDate ? (
                dayjs(departDate).format("LL")
              ) : (
                <SkeletonText className="h-6 w-32 align-middle" />
              )}
            </span>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-5">
          <div className="col-span-4 md:col-span-3">
            {trip && (
              <div className="flex w-full items-center justify-center">
                <TrainVisualization
                  train={trip.train}
                  selectedCarriageId={selectedCarriage?.id}
                  onChangeCarriage={(id) => setQuery("carriageId", id)}
                />
              </div>
            )}

            <div className="mt-5 flex w-full items-center justify-center">
              {selectedCarriage ? (
                <h4 className="">{`Toa số ${selectedCarriage.order}: ${selectedCarriage.seatType.name}`}</h4>
              ) : (
                <SkeletonText className="h-6 w-40" />
              )}
            </div>

            <div className="mt-2">
              {selectedCarriage && (
                <CarriageWithSeats
                  price={price}
                  tripId={+tripId}
                  carriage={selectedCarriage}
                />
              )}
            </div>

            <div className="mt-10 w-full">
              <Table>
                <TableCaption>Chú thích kí hiệu</TableCaption>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <CarriageIcon />
                        <p>Toa còn vé</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <CarriageIcon selected />
                        <p>Toa đang chọn</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <CarriageIcon isFull />
                        <p>Toa hết vé</p>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <Button
                          variant="icon"
                          color="secondary"
                          className={cn("h-9 w-9 text-sm")}
                        />
                        <p>Chỗ trống</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <SeatButton selected hideContent />
                        <p>Chỗ đang chọn</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <SeatButton status="bought" hideContent />
                        <p>Chỗ đã bán, không bán</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="hidden md:col-span-1 md:block">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-normal">Giỏ vé</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="flex w-full flex-col gap-2 divide-y"
                  ref={animateRef}
                >
                  {lineItems.length > 0 ? (
                    lineItems.map((selectedSeat) => (
                      // SE8 Sài Gòn-Hà Nội
                      // 04/01/2024 06:00
                      // NML toa 1 chỗ 50

                      <SelectedSeat key={selectedSeat.id} seat={selectedSeat} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center">
                      <TicketIcon />
                      <p className="text-muted text-center">
                        Giỏ vé của bạn đang trống
                      </p>
                      <p className="text-muted text-center">Lựa vé ngay nào!</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-start">
                {lineItems.length > 0 && (
                  <Button href="/checkout">Mua vé</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetails;
