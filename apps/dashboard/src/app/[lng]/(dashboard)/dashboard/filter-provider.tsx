"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import dayjs from "@ttbs/lib/dayjs";
import { useCompatSearchParams } from "@ttbs/lib/hooks";

import type { FilterContextType } from "./provider";
import { FilterProvider } from "./provider";

const querySchema = z.object({
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  // userId: z.coerce.number().nullable(),
  // eventTypeId: z.coerce.number().nullable(),
  // filter: z.enum(["event-type", "user"]).nullable(),
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const searchParams = useCompatSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  let startTimeParsed, endTimeParsed;

  const safe = querySchema.safeParse({
    startTime: searchParams?.get("startTime") ?? null,
    endTime: searchParams?.get("endTime") ?? null,
  });

  if (!safe.success) {
    console.error("Failed to parse query params");
  } else {
    startTimeParsed = safe.data.startTime;
    endTimeParsed = safe.data.endTime;
  }

  const [configFilters, setConfigFilters] = useState<FilterContextType["filter"]>({
    dateRange: [
      startTimeParsed ? dayjs(startTimeParsed) : dayjs().subtract(1, "month"),
      endTimeParsed ? dayjs(endTimeParsed) : dayjs(),
      "t",
    ],
    selectedTimeView: "week",
    isAll: false,
    initialConfig: {
      isAll: null,
    },
  });

  const { dateRange, selectedTimeView, isAll, initialConfig } = configFilters;
  return (
    <FilterProvider
      value={{
        filter: {
          dateRange,
          selectedTimeView,
          isAll,
          initialConfig,
        },
        setConfigFilters: (newConfigFilters) => {
          setConfigFilters({
            ...configFilters,
            ...newConfigFilters,
          });
          queryClient.invalidateQueries({ queryKey: ["statistic"] });

          const { isAll, dateRange, initialConfig } = newConfigFilters;
          const [startTime, endTime] = dateRange || [null, null];
          const newSearchParams = new URLSearchParams(searchParams?.toString() ?? undefined);
          function setParamsIfDefined(key: string, value: string | number | boolean | null | undefined) {
            if (value !== undefined && value !== null) newSearchParams.set(key, value.toString());
          }

          setParamsIfDefined("isAll", isAll || initialConfig?.isAll);
          setParamsIfDefined("startTime", startTime?.toISOString());
          setParamsIfDefined("endTime", endTime?.toISOString());
          router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        clearFilters: () => {
          const { initialConfig } = configFilters;

          setConfigFilters({
            selectedTimeView: "week",
            isAll: !!initialConfig?.isAll,
            dateRange: [dayjs().subtract(1, "month"), dayjs(), "t"],
            initialConfig,
          });

          const newSearchParams = new URLSearchParams();

          router.push(`${pathname}?${newSearchParams.toString()}`);
        },
      }}
    >
      {children}
    </FilterProvider>
  );
}
