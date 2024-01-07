import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";

import { get } from "@/lib/common/fetch";

import { useFilterContext } from "../provider";
import { CardInsights } from "./card";
import { LoadingInsight } from "./loading-insight";

export const PopularJourneysTable = () => {
  const { t } = useClientTranslation();
  const { filter } = useFilterContext();
  const { dateRange } = filter;
  const [startDate, endDate] = dateRange;

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["statistic", "popular-journeys", startDate, endDate],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      const res = await get(
        `${
          env.NEXT_PUBLIC_API_BASE_URI
        }/api/statistic/popular-journeys?${searchParams.toString()}`,
      );
      return res.data as {
        journeyId: number;
        journeyName: string;
        count: number;
      }[];
    },
    staleTime: 30000,
    enabled: !!startDate && !!endDate,
  });

  if (isLoading) return <LoadingInsight />;

  if (!isSuccess || !startDate || !endDate) return null;

  return (
    <CardInsights>
      <Title className="text-emphasis">{t("popular_events")}</Title>
      <Table className="mt-5">
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.journeyId}>
              <TableCell className="text-default">{item.journeyName}</TableCell>
              <TableCell>
                <Text className="text-default text-right">
                  <strong>{item.count}</strong>
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && (
        <div className="flex h-60 text-center">
          <p className="m-auto text-sm font-light">
            {t("insights_no_data_found_for_filter")}
          </p>
        </div>
      )}
    </CardInsights>
  );
};
