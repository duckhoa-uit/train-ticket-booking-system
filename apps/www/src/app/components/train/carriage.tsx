import { Carriage } from "@/app/lib/types";
import Image from "next/image";
import React from "react";
import trainBody from "../../../../public/trainCar2.png"
const Carriage = ({carriage}: {carriage: Carriage}) => {
  return <div className="text-center">
    <div className="relative">
        <div className="z-[-10] absolute h-[20px] w-full top-0 bg-[#80b5d6] hover:to-blue-600 focus:bg-green-400 rounded-md"></div>
        <Image src={trainBody} width={50} height={50} alt="train"/>
    </div>
    {carriage.code ?? ""}
    </div>;
};

export default Carriage;
