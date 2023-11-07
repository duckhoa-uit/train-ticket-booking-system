"use client";

import React from "react";

import { DatePicker, Input, Label } from "@ttbs/ui";

const SearchBar = () => {
  const current = new Date("2022-03-25");
  return (
    <div className="bg-primary mx-auto h-3/5 w-auto rounded-lg p-5 lg:w-4/5">
      <form action="" className="flex flex-col items-center lg:flex-row">
        <div className="text-primary flex w-auto flex-col items-center gap-2 p-2 md:flex-row lg:w-4/5 lg:grow">
          <div className="lg:flex-1">
            <Label htmlFor="depart" className="self-start font-semibold">
              Nơi khởi hành
            </Label>
            <Input className="border-primary border-2 " id="depart" />
          </div>
          <div className="lg:flex-1">
            <Label htmlFor="arrival" className="self-start font-semibold">
              Nơi đến
            </Label>
            <Input id="arrival" className="border-primary border-2" />
          </div>
          <div className="w-full lg:flex-1">
            <Label htmlFor="arrival" className="self-start font-semibold">
              Ngày khởi hành
            </Label>
            <DatePicker className="border-primary w-full border-2" date={current} />
          </div>
        </div>
        <button className=" bg-accent my-3 w-full rounded-md px-3 py-3 text-center font-medium lg:w-auto lg:flex-1">
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
