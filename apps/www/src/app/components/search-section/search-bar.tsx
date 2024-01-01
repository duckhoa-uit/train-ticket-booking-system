"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import { cn } from "@ttbs/lib/cn";
import type { Station } from "@ttbs/prisma";
import { Button, DatePicker, Label, Select } from "@ttbs/ui";

import { get } from "@/app/lib/fetch";

type Props = {
  className?: string;
  departPlace?: number;
  arrivalPlace?: number;
  departDate?: Date;
};

const SearchBar = ({
  className,
  arrivalPlace: initialArrivalPlace,
  departDate: initialDepartDate,
  departPlace: initialDepartPlace,
}: Props) => {
  const router = useRouter();

  const [departPlace, setDepartPlace] = useState<number | null>(
    initialDepartPlace ?? null,
  );
  const [arrivalPlace, setArrivalPlace] = useState<number | null>(
    initialArrivalPlace ?? null,
  );
  const [departDate, setDepartDate] = useState<Date | undefined>(
    initialDepartDate ?? undefined,
  );

  const { data: stations } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations`);
      return res.data as Station[];
    },
  });

  const stationOpts = (stations ?? []).map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const handleSearchClick = () => {
    if (!departPlace) return toast.error("Please select depart station.");
    if (!arrivalPlace) return toast.error("Please select arrival station.");
    if (!departDate) return toast.error("Please select depart date.");

    const searchParams = new URLSearchParams({
      departStation: `${departPlace}`,
      arrivalStation: `${arrivalPlace}`,
      // date: dayjs(departDate).format("YYYY/MM/DD"),
      date: departDate.toISOString(),
    });

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div
      className={cn(
        "relative h-3/5 w-full p-5",
        "bg-default dark:bg-muted border-subtle rounded-md border px-4 py-10 sm:px-10",
        className,
      )}
    >
      <form className="flex w-full flex-col items-center lg:flex-row lg:items-end">
        <div className="text-emphasis flex w-full flex-col items-center gap-2 p-2 md:flex-row lg:w-4/5 lg:grow">
          <div className="w-full lg:flex-1">
            <Label>Nơi khởi hành</Label>
            <Select
              isSearchable
              placeholder="Ga đi"
              options={stationOpts}
              className="block h-[36px] !w-auto min-w-0 flex-none rounded-md text-sm"
              onChange={(event) => {
                setDepartPlace(event?.value ?? null);
              }}
              value={stationOpts.find((opt) => opt.value === departPlace)}
              isMulti={false}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label>Nơi đến</Label>
            <Select
              isSearchable
              placeholder="Ga đến"
              options={stationOpts}
              className="block h-[36px] !w-auto min-w-0 flex-none rounded-md text-sm"
              onChange={(event) => {
                setArrivalPlace(event?.value ?? null);
              }}
              value={stationOpts.find((opt) => opt.value === arrivalPlace)}
              isMulti={false}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label htmlFor="arrival" className="self-start">
              Ngày khởi hành
            </Label>
            <DatePicker date={departDate} setDate={(d) => setDepartDate(d)} />
          </div>
        </div>
        <div className="w-full p-2 lg:w-auto">
          <Button className="w-full justify-center" onClick={handleSearchClick}>
            Tìm kiếm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
