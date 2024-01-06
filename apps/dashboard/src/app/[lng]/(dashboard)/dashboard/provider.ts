import * as React from "react";

import type dayjs from "@ttbs/lib/dayjs";

interface IFilter {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs, null | string];
  selectedTimeView?: "year" | "week" | "month";
  isAll?: boolean;
  initialConfig?: {
    isAll?: boolean | null;
  };
}

export type FilterContextType = {
  filter: IFilter;
  clearFilters: () => void;
  setConfigFilters: (config: Partial<IFilter>) => void;
};

export const FilterContext = React.createContext<FilterContextType | null>(null);

export function useFilterContext() {
  const context = React.useContext(FilterContext);

  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }

  return context;
}

export function FilterProvider<F extends FilterContextType>(props: { value: F; children: React.ReactNode }) {
  return React.createElement(FilterContext.Provider, { value: props.value }, props.children);
}
