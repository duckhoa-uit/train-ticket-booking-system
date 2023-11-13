"use client";

import type { ChangeEvent } from "react";
import React, { useRef, useState } from "react";

import { useOnClickOutside } from "@ttbs/lib/hooks/index";
import { DatePicker, Input, Label } from "@ttbs/ui";

import InputDropDown from "../InputDropDown";

const SearchBar = () => {
  const current = new Date("2022-03-25");
  const [dropdownDepart, setDropDownDepart] = useState(false);
  const [dropdownArrival, setDropDownArrival] = useState(false);
  const [departPlace, setDepartPlace] = useState("");
  const [arrivalPlace, setArrivalPlace] = useState("");

  const departRef = useRef<HTMLInputElement>(null);
  const arrivalRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!departRef.current?.contains(e.target as Node)) {
      setDropDownDepart(false);
    }
    if (!arrivalRef.current?.contains(e.target as Node)) {
      setDropDownArrival(false);
    }
  };

  const handleClickDropdownItem = (item: string, type: string) => {
    if (type == "depart") {
      setDepartPlace(item);
      setDropDownDepart(false);
      //typesafe
      //need to cast first
      (document.getElementById("depart") as HTMLInputElement).value = departPlace;
    } else if (type == "arrival") {
      setArrivalPlace(item);
      setDropDownArrival(false);
      //typesafe
      //need to cast first
      (document.getElementById("arrival") as HTMLInputElement).value = arrivalPlace;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id == "depart") {
      setDepartPlace(e.target.value);
    } else if (e.target.id == "arrival") {
      setArrivalPlace(e.target.value);
    }
  };

  useOnClickOutside(departRef, handleClickOutside);
  useOnClickOutside(arrivalRef, handleClickOutside);
  return (
    <div className="bg-primary relative mx-auto h-3/5 w-auto rounded-lg p-5 lg:w-4/5">
      <form action="" className="flex flex-col items-center lg:flex-row">
        <div className="text-primary flex w-auto flex-col items-center gap-2 p-2 md:flex-row lg:w-4/5 lg:grow">
          <div className=" lg:flex-1" ref={departRef}>
            <Label htmlFor="depart" className="self-start font-semibold">
              Nơi khởi hành
            </Label>
            <Input
              className="border-primary border-1"
              id="depart"
              onClick={() => {
                setDropDownDepart(!dropdownDepart);
              }}
              onChange={() => handleChange}
              defaultValue={departPlace}
            />
            <InputDropDown type="depart" dropdown={dropdownDepart} handleClick={handleClickDropdownItem} />
          </div>
          <div className="lg:flex-1" ref={arrivalRef}>
            <Label htmlFor="arrival" className="self-start font-semibold">
              Nơi đến
            </Label>
            <Input
              className="border-primary border-1"
              id="arrival"
              defaultValue={arrivalPlace}
              onChange={() => handleChange}
              onClick={() => {
                setDropDownArrival(!dropdownArrival);
              }}
            />
            <InputDropDown type="arrival" dropdown={dropdownArrival} handleClick={handleClickDropdownItem} />
          </div>
          <div className="w-full lg:flex-1">
            <Label htmlFor="arrival" className="self-start font-semibold">
              Ngày khởi hành
            </Label>
            <DatePicker
              className="border-primary w-full border-none font-normal outline-none"
              date={current}
            />
          </div>
        </div>
        <button className=" bg-accent text-secondary my-3 w-full rounded-md px-3 py-3 text-center font-medium lg:w-auto lg:flex-1">
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
