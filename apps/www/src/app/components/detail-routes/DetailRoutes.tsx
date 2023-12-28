"use client";

import Link from "next/link";
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

// import closeIcon from "../../../public/img/close.svg";

type TableHeadItem = {
  key: number;
  title: string;
};

type DetailRoutes = {
  key?: number;
  departStation?: string;
  departDate?: string;
  arrivalTime?: string;
  departTime?: string;
  className?: string;
};

const TRAIN_DETAILS: DetailRoutes[] = [
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

export const DetailRoutes = (props: DetailRoutes) => {
  const router = useRouter();
  return (
    <div className={cn("md:text-normal mx-auto h-max rounded-sm bg-white p-5 text-sm", props.className)}>
      {/* <TripItem className="p-5" /> */}
      <Table className="mx-auto w-full">
        <TableHeader className="[&_tr]:bg-info hover:bg-current">
          <TableRow className=" text-center text-white">
            {TABLE_HEAD_ITEMS.map((item) => (
              <TableHead className="text-center " key={item.key}>
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
      <div className="mt-5 box-border flex items-center justify-around">
        <Button
          onClick={() => {
            router.push("/book-seats");
          }}
        >
          <span>Đặt vé</span>
        </Button>
        <Link
          className="text-attention box-border flex items-center justify-center rounded-sm p-2 font-semibold"
          href="/train-detail"
        >
          <span>Xem chi tiết</span>
        </Link>
      </div>
    </div>
  );
};
