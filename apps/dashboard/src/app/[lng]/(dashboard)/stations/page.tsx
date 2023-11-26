"use client";

import { useQuery } from "@tanstack/react-query";

import type { Station } from "@ttbs/prisma";

import { get } from "@/lib/common/fetch";

import { StationsTable } from "./_components/stations-table";
import { searchParamsSchema } from "./search-params-schema";

interface StationsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function Stations({ searchParams }: StationsPageProps) {
  const { page, per_page, sort } = searchParamsSchema.parse(searchParams);

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page);
  const fallbackPage = isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  // Number of items per page
  const perPageAsNumber = Number(per_page);
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  // Column and order to sort by
  // Spliting the sort string by "." to get the column and order
  // Example: "title.desc" => ["title", "desc"]
  const [column, order] = (sort?.split(".") as [keyof Station | undefined, "asc" | "desc" | undefined]) ?? [
    "title",
    "desc",
  ];

  // const statuses = (status?.split(".") as Station["status"][]) ?? []

  const stationsQuery = useQuery({
    queryKey: ["stations", limit, offset, column, order],
    queryFn: async () => {
      const res = await get("http://localhost:8081/api/stations");
      return res.data;
    },
  });

  return <StationsTable data={stationsQuery.data ?? []} pageCount={1} />;
}
