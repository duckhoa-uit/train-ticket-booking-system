"use client";

import Link from "next/link";
import React, { useState } from "react";

import { cn } from "@ttbs/lib/cn";
import { Button, DatePicker, Label, Select } from "@ttbs/ui";

import { provinceOpts } from "./provinces";

type Props = {
  className?: string;
  departPlace?: string;
  arrivalPlace?: string;
  departDate?: string;
};

const SearchBar = (Props: Props) => {
  const [departPlace, setDepartPlace] = useState("");
  const [arrivalPlace, setArrivalPlace] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date>();

  return (
    <div
      className={cn(
        "relative h-3/5 w-full p-5 lg:w-4/5",
        "bg-default dark:bg-muted border-subtle rounded-md border px-4 py-10 sm:px-10",
        Props.className
      )}
    >
      <form className="flex w-full flex-col items-center lg:flex-row lg:items-end">
        <div className="text-emphasis flex w-full flex-col items-center gap-2 p-2 md:flex-row lg:w-4/5 lg:grow">
          <div className="w-full lg:flex-1">
            <Label>Nơi khởi hành</Label>
            <Select
              isSearchable
              //nên có biến options -> sẽ reusable hơn
              options={provinceOpts}
              className="block h-[36px] !w-auto min-w-0 flex-none rounded-md text-sm"
              onChange={(event) => {
                setDepartPlace(event?.value ?? "");
              }}
              defaultValue={{
                label: Props.departPlace ?? "",
                value: Props.departPlace ?? "",
              }}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label>Nơi đến</Label>
            <Select
              isSearchable
              options={provinceOpts}
              className="block h-[36px] !w-auto min-w-0 flex-none rounded-md text-sm"
              onChange={(event) => {
                //có value thì
                setArrivalPlace(event?.value ?? "");
              }}
              defaultValue={{
                label: Props.arrivalPlace ?? "",
                value: Props.arrivalPlace ?? "",
              }}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label htmlFor="arrival" className="self-start">
              Ngày khởi hành
            </Label>
            <DatePicker date={arrivalDate} setDate={(d) => setArrivalDate(d)} />
          </div>
        </div>
        <div className="w-full p-2 lg:w-auto">
          <Button className="w-full justify-center">
            <Link
              href={{
                pathname: "/search-result",
                query: {
                  "depart-station": departPlace,
                  "arrival-station": arrivalPlace,
                  date: arrivalDate?.toISOString(),
                },
              }}
            >
              Tìm kiếm
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
