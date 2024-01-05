"use client";

import { useQuery } from "@tanstack/react-query";

import { env } from "@ttbs/env";
import type { Station } from "@ttbs/prisma";

import { get } from "@/lib/common/fetch";

import { OrdersTable } from "./_components/orders-table";
import { searchParamsSchema } from "./search-params-schema";

interface OrdersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function Orders({ searchParams }: OrdersPageProps) {
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

  const ordersQuery = useQuery({
    queryKey: ["orders", limit, offset, column, order],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/orders`);
      return res.data;
    },
  });

  return <OrdersTable data={ordersQuery.data ?? []} pageCount={1} />;
}
