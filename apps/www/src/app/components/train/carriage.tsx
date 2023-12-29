// import { Carriage } from "@/types";
import Image from "next/image";
import React from "react";

import type { Carriage as CarriageType } from "@ttbs/prisma";

const Carriage = ({ carriage }: { carriage: CarriageType }) => {
  return (
    <div className="text-center">
      <div className="relative">
        <div className="absolute top-0 z-[-10] h-[20px] w-full rounded-md bg-[#80b5d6] hover:to-blue-600 focus:bg-green-400" />
        <Image src="/trainCar2.png" width={50} height={50} alt="train" />
      </div>
      {carriage.code ?? ""}
    </div>
  );
};

export default Carriage;
