"use client";

import { useQuery } from "@tanstack/react-query";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import type { Trip } from "@ttbs/prisma";
import { Button } from "@ttbs/ui";

import { ShellMain } from "@/components/layout/common";
import MainLayout from "@/components/layout/main-layout";
import { get } from "@/lib/common/fetch";

import { TripsTable } from "./_components/trips-table";
import { searchParamsSchema } from "./search-params-schema";

interface TripsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function Trips({ searchParams }: TripsPageProps) {
  const { t } = useClientTranslation();

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
  const [column, order] = (sort?.split(".") as [keyof Trip | undefined, "asc" | "desc" | undefined]) ?? [
    "title",
    "desc",
  ];

  const tripsQuery = useQuery({
    queryKey: ["trips", limit, offset, column, order],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/trips`);
      return res.data;
    },
  });

  return (
    <MainLayout>
      <ShellMain
        withoutSeo
        heading={t("trips_page_title")}
        hideHeadingOnMobile
        CTA={<Button href="/trips/new">{t("add_trip")}</Button>}
      >
        <TripsTable data={tripsQuery.data ?? []} pageCount={1} />
      </ShellMain>
    </MainLayout>
  );
}
