"use client";

import React, { useState } from "react";

import { cn } from "@ttbs/lib/cn";
import { Button, DatePicker, Label, Select } from "@ttbs/ui";

import { provinceOpts } from "./provinces";

const SearchBar = () => {
  const current = new Date("2022-03-25");
  const [departPlace, setDepartPlace] = useState("");
  console.log("🚀 ~ file: SearchBar.tsx:13 ~ SearchBar ~ departPlace:", departPlace);
  const [arrivalPlace, setArrivalPlace] = useState("");
  console.log("🚀 ~ file: SearchBar.tsx:15 ~ SearchBar ~ arrivalPlace:", arrivalPlace);

  return (
    <div
      className={cn(
        "relative h-3/5 w-full p-5 lg:w-4/5",
        "bg-default dark:bg-muted border-subtle rounded-md border px-4 py-10 sm:px-10"
      )}>
      <form className="flex w-full flex-col items-center lg:flex-row lg:items-end">
        <div className="text-emphasis flex w-full flex-col items-center gap-2 p-2 md:flex-row lg:w-4/5 lg:grow">
          <div className="w-full lg:flex-1">
            <Label>Nơi khởi hành</Label>
            <Select
              isSearchable
              options={provinceOpts}
              className="block h-[36px] !w-auto min-w-0 flex-none rounded-md text-sm"
              onChange={(event) => {
                setDepartPlace(event?.value ?? "");
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
                setArrivalPlace(event?.value ?? "");
              }}
            />
          </div>
          <div className="w-full lg:flex-1">
            <Label htmlFor="arrival" className="self-start">
              Ngày khởi hành
            </Label>
            <DatePicker className="w-full font-normal outline-none" date={current} />
          </div>
        </div>
        <div className="w-full p-2 lg:w-auto">
          <Button className="w-full justify-center">Tìm kiếm</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
