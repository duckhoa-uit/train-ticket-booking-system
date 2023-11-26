"use client";

import { useQuery } from "@tanstack/react-query";

import { env } from "@ttbs/env";
import type { Journey } from "@ttbs/prisma";

import { get } from "@/lib/common/fetch";

import { JourneysTable } from "./_components/journeys-table";
import { searchParamsSchema } from "./search-params-schema";

interface JourneysPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function Journeys({ searchParams }: JourneysPageProps) {
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
  const [column, order] = (sort?.split(".") as [keyof Journey | undefined, "asc" | "desc" | undefined]) ?? [
    "title",
    "desc",
  ];

  const journeysQuery = useQuery({
    queryKey: ["journeys", limit, offset, column, order],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys`);
      return res.data;
    },
  });

  return <JourneysTable data={journeysQuery.data ?? []} pageCount={1} />;
}
