"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { cn } from "@ttbs/lib/cn";
import { CONVERT_PARAMS_TO_VN } from "@ttbs/lib/constants";

import SearchBar from "@/app/components/search-section/search-bar";
import { TripItem } from "@/app/components/trip-item/trip-item";

const SearchPage = () => {
  const params = useSearchParams();

  const departPlace = params.get("depart-station");
  const arrivalPlace = params.get("arrival-station");
  const departTime = params.get("date");
  return (
    <div className={cn("md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl text-sm md:mt-10")}>
      <SearchBar className="mx-auto my-5 md:my-10 lg:mx-5 lg:w-full" />

      <div className="flex">
        <div className="border-default hidden w-1/5 border-r md:block" />
        <div className="w-full p-5 md:w-4/5">
          <div className=" mb-5 flex gap-5 text-base md:text-xl">
            <p>{CONVERT_PARAMS_TO_VN(departPlace)} </p>
            <p>{CONVERT_PARAMS_TO_VN(arrivalPlace)} </p>
            <p className="border-emphasis border-l-2 pl-5">{departTime}</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <TripItem />
            <TripItem />
            <TripItem />
            <TripItem />
            <TripItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
