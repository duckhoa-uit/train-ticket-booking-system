import { useQuery } from "@tanstack/react-query";
import { Grid } from "@tremor/react";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { SkeletonContainer, SkeletonText } from "@ttbs/ui";

import { get } from "@/lib/common/fetch";

import { useFilterContext } from "../provider";
import { CardInsights } from "./card";
import { KPICard } from "./kpi-card";

export const SummaryCards = () => {
  const { t } = useClientTranslation();
  const { filter } = useFilterContext();
  const { dateRange } = filter;
  const [startDate, endDate] = dateRange;

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["statistic", "summary", startDate, endDate],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      const res = await get(
        `${
          env.NEXT_PUBLIC_API_BASE_URI
        }/api/statistic/summary?${searchParams.toString()}`,
      );
      return res.data;
    },
    staleTime: 30000,
  });

  const categories: {
    title: string;
    index: "created" | "completed" | "pending" | "cancelled";
  }[] = [
    {
      title: t("orders_created"),
      index: "created",
    },
    {
      title: t("orders_completed"),
      index: "completed",
    },
    {
      title: t("orders_pending"),
      index: "pending",
    },
    {
      title: t("orders_cancelled"),
      index: "cancelled",
    },
  ];

  if (isLoading) {
    return <LoadingSummaryCards categories={categories} />;
  }

  if (!isSuccess || !startDate || !endDate) return null;

  return (
    <>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-x-4 gap-y-4">
        {categories.map((item) => (
          <KPICard
            key={item.title}
            title={item.title}
            value={data[item.index].count}
            previousMetricData={data[item.index]}
            previousDateRange={data.previousRange}
          />
        ))}
      </Grid>
    </>
  );
};

const LoadingSummaryCards = (props: {
  categories: { title: string; index: string }[];
}) => {
  const { categories } = props;
  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-x-4 gap-y-4">
      {categories.map((item) => (
        <CardInsights key={item.title}>
          <SkeletonContainer className="flex w-full flex-col">
            <SkeletonText className="mt-2 h-4 w-32" />
            <SkeletonText className="mt-2 h-6 w-16" />
            <SkeletonText className="mt-4 h-6 w-44" />
          </SkeletonContainer>
        </CardInsights>
      ))}
    </Grid>
  );
};
