"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@ttbs/lib/cn";
import { CONVERT_PARAMS_TO_VN } from "@ttbs/lib/constants";
import dayjs from "@ttbs/lib/dayjs";
import { Button, Select } from "@ttbs/ui";

import SearchBar from "@/app/components/search-section/search-bar";
import { TripItem } from "@/app/components/trip-item/trip-item";

type SortFilterItem = {
  label: string;
  value: string;
  name?: string;
  key?: number;
};

const SORT_ITEMS: SortFilterItem[] = [
  {
    label: "Mặc định",
    value: "default",
  },
  {
    label: "Giờ đi sớm",
    value: "Giờ đi sớm",
  },
  {
    label: "Giờ đi muộn",
    value: "Giờ đi muộn",
  },
];

const FILTER_ITEMS: SortFilterItem[] = [
  {
    label: "Mặc định",
    value: "Mặc định",
    key: 0,
  },
  {
    name: "Sáng sớm",
    label: "00:00 - 06:00",
    value: "00:00 - 06:00",
    key: 1,
  },
  {
    name: "Buổi sáng",
    label: "06:01 - 12:00",
    value: "06:01 - 12:00",
    key: 2,
  },
  { name: "Buổi chiều", label: "12:01 - 18:00", value: "12:01 - 18:00", key: 3 },
  {
    name: "Tối khuya",
    label: "18:01 - 23:59",
    value: "18:01 - 23:59",
    key: 4,
  },
];

const SearchPage = () => {
  const [activeButton, setActiveButton] = useState("");

  const params = useSearchParams();

  const departPlace = params.get("depart-station");
  const arrivalPlace = params.get("arrival-station");
  const departTime = params.get("date");
  const date = dayjs(departTime).format("DD/MM/YYYY");

  const handleClickFilter = (key: string) => {
    setActiveButton(key);
  };

  return (
    <div className={cn("md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl text-sm md:mt-10")}>
      <SearchBar
        departPlace={CONVERT_PARAMS_TO_VN(departPlace)}
        arrivalPlace={CONVERT_PARAMS_TO_VN(arrivalPlace) ?? ""}
        departDate={date ?? ""}
        className="m-5 mx-auto md:my-10 lg:w-full"
      />

      <div className="flex">
        <div className="border-default hidden w-1/5 border-r md:block md:pr-5">
          <div className=" bg-default  mb-2 flex justify-between px-3 py-5 md:block md:rounded-md" id="sort">
            <h5 className=" m-2 text-base font-semibold">Sắp xếp</h5>
            <div className="flex flex-col justify-between gap-2 pl-2">
              {SORT_ITEMS.map((item) => {
                return (
                  <div className="flex items-center gap-2" key={item.key}>
                    <input type="radio" name="sort" id="default" />
                    <label className="text-base md:text-xs" htmlFor="default">
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" bg-default mb-2 flex justify-between px-3 py-5 md:block md:rounded-md">
            <h5 className=" m-2 text-base font-semibold">Lọc theo thời gian</h5>
            <div className="flex flex-col justify-between gap-2 pl-2">
              {FILTER_ITEMS.map((item) => {
                return (
                  <Button
                    key={item.key}
                    variant="button"
                    color="primary"
                    size="base"
                    className={`border-default hover:bg-w mb-2 flex h-max flex-col border bg-white text-black md:text-xs ${
                      activeButton === item.value && "border-attention border-2"
                    }`}
                    onClick={() => handleClickFilter(item.value)}
                  >
                    <p>{item.name}</p>
                    <p>{item.value}</p>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full pl-5 md:w-4/5">
          <div className=" mb-5 flex gap-5 text-base md:text-xl">
            <p>{CONVERT_PARAMS_TO_VN(departPlace)} </p>
            <p>đến</p>
            <p>{CONVERT_PARAMS_TO_VN(arrivalPlace)} </p>
            <p className="border-emphasis border-l-2 pl-5">{date}</p>
          </div>
          <div className="mb-2 flex items-center justify-between md:hidden" id="sort">
            <h5 className=" text-base font-semibold">Sắp xếp</h5>
            <Select defaultValue={SORT_ITEMS[0]} options={SORT_ITEMS} />
          </div>
          <div className="mb-2 flex items-center justify-between md:hidden" id="sort">
            <h5 className=" text-base font-semibold">Lọc theo thời gian</h5>
            <Select className="md:hidden" defaultValue={FILTER_ITEMS[0]} options={FILTER_ITEMS} />
          </div>
          <div className="flex w-full flex-col gap-2 overflow-y-auto">
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
