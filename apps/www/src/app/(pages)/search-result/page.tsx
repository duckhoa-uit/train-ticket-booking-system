"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@ttbs/lib/cn";
import { CONVERT_PARAMS_TO_VN } from "@ttbs/lib/constants";
import dayjs from "@ttbs/lib/dayjs";
import { Button, Select } from "@ttbs/ui";

import SearchBar from "@/app/components/search-section/search-bar";
import { TripItem } from "@/app/components/trip-item/trip-item";

const SearchPage = () => {
  const [activeBtn, setActiveBtn] = useState(false);

  const params = useSearchParams();

  const departPlace = params.get("depart-station");
  const arrivalPlace = params.get("arrival-station");
  const departTime = params.get("date");
  const date = dayjs(departTime).format("DD/MM/YYYY");

  const handleClickFilter = () => {
    setActiveBtn(!activeBtn);
  };

  type SortItem = {
    label: string;
    value: string;
  };

  const SORT_ITEMS: SortItem[] = [
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

  return (
    <div className={cn("md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl text-sm md:mt-10")}>
      <SearchBar className="mx-auto my-5 md:my-10 lg:mx-5 lg:w-full" />

      <div className="flex">
        <div className="border-default hidden w-1/5 border-r md:block md:p-5">
          <div className=" bg-default mb-2 flex justify-between p-3 md:block md:rounded-md" id="sort">
            <h5 className=" m-2 text-base font-semibold">Sắp xếp</h5>
            <div className="flex flex-col justify-between gap-2 pl-2">
              <div className="flex items-center gap-2">
                <input type="radio" name="sort" id="default" />
                <label className="text-base md:text-xs" htmlFor="default">
                  Mặc định
                </label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" name="sort" id="sooner" />
                <label className="text-base md:text-xs" htmlFor="sooner">
                  Giờ đi sớm
                </label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" name="sort" id="later" />
                <label className="text-base md:text-xs" htmlFor="later">
                  Giờ đi muộn
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-5 md:w-4/5">
          <div className=" mb-5 flex gap-5 text-base md:text-xl">
            <p>{CONVERT_PARAMS_TO_VN(departPlace)} </p>
            <p>{CONVERT_PARAMS_TO_VN(arrivalPlace)} </p>
            <p className="border-emphasis border-l-2 pl-5">{date}</p>
          </div>
          <div className="mb-2 flex justify-between md:hidden" id="sort">
            <h5 className=" text-base font-semibold">Sắp xếp</h5>
            <Select defaultValue={SORT_ITEMS[0]} options={SORT_ITEMS} />
          </div>
          <div className="mb-2 flex justify-between md:hidden" id="sort">
            <h5 className=" text-base font-semibold">Bộ lọc</h5>
            <div className="flex justify-between gap-2">
              <div>
                <Button
                  variant="button"
                  color="primary"
                  size="base"
                  className={`border-default hover:bg-w mb-2 flex h-max flex-col border bg-white text-black ${
                    activeBtn && "border-[#73321B]"
                  }`}
                  onClick={handleClickFilter}>
                  <p>Sáng sớm</p>
                  <p>00:00 - 06:00</p>
                </Button>
                <Button
                  variant="button"
                  color="primary"
                  size="base"
                  className="border-default flex h-max flex-col border bg-white text-black hover:bg-white">
                  <p>Buổi sáng</p>
                  <p>00:00 - 06:00</p>
                </Button>
              </div>
              <div>
                <Button
                  variant="button"
                  color="primary"
                  size="base"
                  className="border-default mb-2 flex h-max flex-col border bg-white text-black hover:bg-white">
                  <p>Sáng sớm</p>
                  <p>00:00 - 06:00</p>
                </Button>
                <Button
                  variant="button"
                  color="primary"
                  size="base"
                  className="border-default flex h-max flex-col border bg-white text-black hover:bg-white">
                  <p>Sáng sớm</p>
                  <p>00:00 - 06:00</p>
                </Button>
              </div>
            </div>
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
