"use client";

import Lottie from "lottie-react";
import React from "react";

import train from "@/app/lottie-animation/train.json";

export const TrainLoader = () => {
  return <Lottie className="h-20 w-20" animationData={train} />;
};
