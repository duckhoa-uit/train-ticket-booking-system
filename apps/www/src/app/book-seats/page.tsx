import React from "react";

import { cn } from "@ttbs/lib/cn";

import Train from "../components/train/train";

const BookSeats = () => {
  return (
    <div className={cn("md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl p-5 text-sm md:mt-10")}>
      BookSeats
      <Train />
    </div>
  );
};

export default BookSeats;
