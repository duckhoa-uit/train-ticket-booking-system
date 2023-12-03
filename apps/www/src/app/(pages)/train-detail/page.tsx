"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { cn } from "@ttbs/lib/cn";
import { Button } from "@ttbs/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

import { TripItem } from "@/app/components/trip-item/trip-item";

type TableHeadItem = {
  key: number;
  title: string;
};

type TrainDetail = {
  key: number;
  departStation: string;
  departDate: string;
  arrivalTime: string;
  departTime: string;
};

const TRAIN_DETAILS: TrainDetail[] = [
  {
    key: 0,
    departStation: "Sài Gòn",
    departDate: "23/11/2023",
    departTime: "06:00",
    arrivalTime: "12:30",
  },
  {
    key: 1,
    departStation: "Sài Gòn",
    departDate: "23/11/2023",
    departTime: "06:00",
    arrivalTime: "12:30",
  },
  {
    key: 2,
    departStation: "Sài Gòn",
    departDate: "23/11/2023",
    departTime: "06:00",
    arrivalTime: "12:30",
  },
  {
    key: 3,
    departStation: "Sài Gòn",
    departDate: "23/11/2023",
    departTime: "06:00",
    arrivalTime: "12:30",
  },
  {
    key: 4,
    departStation: "Sài Gòn",
    departDate: "23/11/2023",
    departTime: "06:00",
    arrivalTime: "12:30",
  },
];

const TABLE_HEAD_ITEMS: TableHeadItem[] = [
  {
    key: 0,
    title: "STT",
  },
  {
    key: 1,
    title: "Ga đi",
  },
  {
    key: 2,
    title: "Ngày xuất phát",
  },
  {
    key: 3,
    title: "Giờ đến ga",
  },
  {
    key: 4,
    title: "Giờ xuất phát",
  },
];

const TrainDetail = () => {
  const router = useRouter();
  return (
    <div className={cn("md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl p-5 text-sm md:mt-10")}>
      <TripItem />
      <Table className="mx-auto w-full">
        <TableHeader className="[&_tr]:bg-info">
          <TableRow className=" text-center text-white">
            {TABLE_HEAD_ITEMS.map((item) => (
              <TableHead className="text-center" key={item.key}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRAIN_DETAILS.map((route) => (
            <TableRow key={route.key}>
              <TableCell className="text-center">{route.key}</TableCell>
              <TableCell className="text-center">{route.departStation}</TableCell>
              <TableCell className="text-center">{route.departDate}</TableCell>
              <TableCell className="text-center">{route.arrivalTime}</TableCell>
              <TableCell className="text-center">{route.departTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="button"
        color="primary"
        size="base"
        className="border-default hover:bg-w mb-2 flex h-max flex-col border bg-white text-black md:text-xs"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default TrainDetail;
