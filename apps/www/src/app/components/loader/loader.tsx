"use client";

import Lottie from "lottie-react";
import React from "react";

import train from "@/app/lottie-animation/train.json";

export const TrainLoader = () => {
  return <Lottie className="mx-auto h-40 w-40" animationData={train} />;
};
