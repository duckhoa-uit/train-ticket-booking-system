"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

import { env } from "@ttbs/env";
import { useTypedQuery } from "@ttbs/lib";
import { cn } from "@ttbs/lib/cn";
import dayjs from "@ttbs/lib/dayjs";
import type { Station } from "@ttbs/prisma";
import { Button, Group, RadioField, Select, SkeletonText } from "@ttbs/ui";

import SearchBar from "@/app/components/search-section/search-bar";
import { TripCard } from "@/app/components/trip-card/trip-card";
import { get } from "@/app/lib/fetch";
import type { SearchTripItemApiResponse } from "@/types";

import { PaginationSection } from "../components/pagination";
import { searchTripsQuerySchema } from "./query-schema";

type SortFilterItem = {
  label: string;
  value: string;
};

const SORT_ITEMS: SortFilterItem[] = [
  {
    label: "Mặc định",
    value: "",
  },
  {
    label: "Giờ đi sớm",
    value: "departDate|asc",
  },
  {
    label: "Giờ đi muộn",
    value: "departDate|desc",
  },
];

const FILTER_ITEMS: SortFilterItem[] = [
  {
    label: "Mặc định",
    value: "",
  },
  {
    label: "Sáng sớm",
    value: "00:00-06:00",
  },
  {
    label: "Buổi sáng",
    value: "06:01-12:00",
  },
  { label: "Buổi chiều", value: "12:01-18:00" },
  {
    label: "Tối khuya",
    value: "18:01-23:59",
  },
];

const SearchPage = () => {
  const {
    data: {
      arrivalStation: arrivalStationId,
      date: departDate,
      departStation: departStationId,
      orderBy,
      skip,
      limit,
      timeRange,
    },
    setQuery,
  } = useTypedQuery(searchTripsQuerySchema);

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

  const { data: { trips, count: totalItems } = {} } = useQuery({
    queryKey: [
      "search",
      departStationId,
      arrivalStationId,
      departDate,
      skip,
      limit,
      timeRange,
    ],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        skip: `${skip}`,
        limit: `${limit}`,
        departStationId: `${departStationId}`,
        arrivalStationId: `${arrivalStationId}`,
        departDate: departDate,
        timeRange,
        ...(orderBy ? { orderBy } : {}),
      });

      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/search?${searchParams.toString()}`,
      );
      return {
        trips: res.data as Array<SearchTripItemApiResponse>,
        count: res.count as number,
      };
    },
  });

  return (
    <div
      className={cn(
        "md:text-normal mx-auto mt-5 min-h-[calc(100dvh-64px)] w-full max-w-7xl px-5 text-sm md:mt-24 md:min-h-[calc(100dvh-80px)]",
      )}
    >
      <SearchBar
        departPlace={departStationId}
        arrivalPlace={arrivalStationId}
        departDate={dayjs(departDate).toDate()}
        className="m-5 mx-auto md:my-10 lg:w-full"
      />

      <div className="flex">
        <div className="border-default hidden w-1/5 border-r md:block md:pr-5">
          <div
            className=" bg-default  mb-2 flex justify-between px-3 py-5 md:block md:rounded-md"
            id="sort"
          >
            <h5 className=" m-2 text-base font-semibold">Sắp xếp</h5>
            <div className="flex flex-col justify-between gap-2 pl-2">
              <Group
                defaultValue={orderBy}
                value={orderBy}
                onValueChange={(val) => setQuery("orderBy", val)}
              >
                {SORT_ITEMS.map((item) => {
                  return (
                    <RadioField
                      key={item.value}
                      label={item.label}
                      id={item.value}
                      value={item.value}
                    />
                  );
                })}
              </Group>
            </div>
          </div>
          <div className=" bg-default mb-2 flex justify-between px-3 py-5 md:block md:rounded-md">
            <h5 className=" m-2 text-base font-semibold">Lọc theo thời gian</h5>
            <div className="flex flex-col justify-between gap-2 pl-2">
              {FILTER_ITEMS.map((item) => {
                return (
                  <Button
                    key={item.value}
                    variant="button"
                    color="primary"
                    size="base"
                    className={`border-default hover:bg-w mb-2 flex h-max flex-col border bg-white text-black md:text-xs ${
                      timeRange === item.value && "border-attention border-2"
                    }`}
                    onClick={() => setQuery("timeRange", item.value)}
                  >
                    <p>{item.label}</p>
                    <p>{item.value}</p>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 md:pl-5">
          <div className="hidden gap-5 text-base md:flex md:text-xl">
            <p>
              {!departPlace ? (
                <SkeletonText className="h-6 w-20 align-middle" />
              ) : (
                <span>{departPlace.name}</span>
              )}

              <span> đến </span>

              {!arrivalPlace ? (
                <SkeletonText className="h-6 w-20 align-middle" />
              ) : (
                <span>{arrivalPlace.name}</span>
              )}
            </p>
            <p className="border-emphasis border-l-2 pl-5">
              {departDate ? (
                dayjs(departDate).format("LL")
              ) : (
                <SkeletonText className="h-6 w-32 align-middle" />
              )}
            </p>
          </div>
          <div
            className="mb-2 flex items-center justify-between md:hidden"
            id="sort"
          >
            <h5 className=" text-base font-semibold">Sắp xếp</h5>
            <Select defaultValue={SORT_ITEMS[0]} options={SORT_ITEMS} />
          </div>
          <div
            className="mb-2 flex items-center justify-between md:hidden"
            id="sort"
          >
            <h5 className=" text-base font-semibold">Lọc theo thời gian</h5>
            <Select
              className="md:hidden"
              defaultValue={FILTER_ITEMS[0]}
              options={FILTER_ITEMS}
            />
          </div>
          <div className="over flex w-full flex-col gap-2 py-5">
            {trips?.map((trip) => <TripCard trip={trip} key={trip.id} />)}
          </div>

          <div className="flex w-full items-center justify-center">
            <PaginationSection
              totalItems={totalItems ?? 0}
              itemsPerPage={limit}
              currentPage={totalItems ? skip / limit + 1 : 1}
              setCurrentPage={(p) => {
                setQuery("skip", limit * (p - 1));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
