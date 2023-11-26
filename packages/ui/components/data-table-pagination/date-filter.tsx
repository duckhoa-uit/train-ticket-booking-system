import type { Column } from "@tanstack/react-table";

import { DatePicker } from "../form/datepicker";

interface DataTableDateFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  disabled?: boolean;
}

export function DataTableDateFilter<TData, TValue>({ column }: DataTableDateFilter<TData, TValue>) {
  const _filterValue = column?.getFilterValue();

  return <DatePicker date={new Date()} />;
}
