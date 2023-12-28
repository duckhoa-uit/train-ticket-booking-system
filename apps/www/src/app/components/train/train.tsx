import { Train } from "@/app/lib/types";
import React from "react";
import Carriage from "./carriage";
import trainHead from "../../../../public/train2.png"
import Image from "next/image";
const TRAIN: Train = {
    carriages: [
        {
            code: "1",
            name: "1"
        },
                {
            code: "2",
            name: "2"
        },
                {
            code: "3",
            name: "3"
        },
                {
            code: "4",
            name: "4"
        },
                {
            code: "5",
            name: "5"
        },
                        
        {
            code: "6",
            name: "6"
        },
        {
            code: "7",
            name: "7"
        },
        {
            code: "8",
            name: "8"
        },
        {
            code: "9",
            name: "9"
        },
    ]
}

const FILTERED_CARRIAGES = TRAIN.carriages.reverse()

const Train = () => {
  return <div className="flex gap-2">
    {FILTERED_CARRIAGES.map((carriage) => (
        <Carriage carriage={carriage}/>
    ))}
    <Image className="h-max" 
    src={trainHead} width={50} height={27.7} 
    alt="train-head"/>
  </div>;
};

export default Train;
