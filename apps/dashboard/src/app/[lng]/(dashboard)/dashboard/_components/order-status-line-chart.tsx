import { useQuery } from "@tanstack/react-query";
import { Title } from "@tremor/react";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";

import { get } from "@/lib/common/fetch";

import { valueFormatter } from "../lib/valueFormatter";
import { useFilterContext } from "../provider";
import { CardInsights } from "./card";
import { LineChart } from "./line-chart";
import { LoadingInsight } from "./loading-insight";

export const OrderStatusLineChart = () => {
  const { t } = useClientTranslation();
  const { filter } = useFilterContext();
  const { selectedTimeView = "week", dateRange } = filter;
  const [startDate, endDate] = dateRange;

  const {
    data: ordersTimeline,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["statistic", "orders-timeline", selectedTimeView, startDate, endDate],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        timeView: selectedTimeView,
      });

      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/statistic/orders-timeline?${searchParams.toString()}`
      );
      return res.data;
    },
    staleTime: 30000,
    enabled: !!startDate && !!endDate,
  });

  if (isLoading) return <LoadingInsight />;

  if (!isSuccess) return null;

  return (
    <CardInsights>
      <Title className="text-emphasis">{t("order_trends")}</Title>
      <LineChart
        className="linechart mt-4 h-80"
        data={ordersTimeline ?? []}
        categories={["Created", "Completed", "Pending", "Cancelled"]}
        index="Month"
        colors={["purple", "green", "blue", "red"]}
        valueFormatter={valueFormatter}
      />
    </CardInsights>
  );
};
