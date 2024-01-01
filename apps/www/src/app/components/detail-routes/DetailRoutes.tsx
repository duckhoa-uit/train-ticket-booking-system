"use client";

import { useQuery } from "@tanstack/react-query";

import { env } from "@ttbs/env";
import { cn } from "@ttbs/lib/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

import dayjs from "@/app/lib/dayjs";
import { get } from "@/app/lib/fetch";
import type { SearchTripItemApiResponse } from "@/types";

// import closeIcon from "../../../public/img/close.svg";

type TableHeadItem = {
  key: number;
  title: string;
};

type DetailRoutesProps = {
  tripId: number;
};

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
    title: "Giờ xuất phát",
  },
  {
    key: 3,
    title: "Giờ đến ga",
  },
];

export const DetailRoutes = ({ tripId }: DetailRoutesProps) => {
  const { data: trip } = useQuery({
    queryKey: ["trips", tripId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trips/${tripId}`,
      );
      return res.data as SearchTripItemApiResponse;
    },
  });

  const { timelines = [] } = trip ?? {};

  return (
    <div className={cn("md:text-normal rounded-sm bg-white text-sm")}>
      <Table className="mx-auto w-full">
        <TableHeader className="">
          <TableRow className=" text-center text-white">
            {TABLE_HEAD_ITEMS.map((item) => (
              <TableHead className="min-w-28 text-center" key={item.key}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timelines.map(({ station, arrivalDate, departDate }, idx) => (
            <TableRow key={station.id}>
              <TableCell className="text-center">{idx + 1}</TableCell>
              <TableCell className="text-center">{station.name}</TableCell>
              <TableCell className="text-center">
                {dayjs(departDate).format("LLL")}
              </TableCell>
              <TableCell className="text-center">
                {dayjs(arrivalDate).format("LLL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
