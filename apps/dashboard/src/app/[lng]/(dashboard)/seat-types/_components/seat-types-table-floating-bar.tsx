"use client";

import { type Table } from "@tanstack/react-table";

import { cn } from "@ttbs/lib/cn";
import { Button } from "@ttbs/ui";
import { X, TrashIcon } from "@ttbs/ui/components/icons";

interface DataTableFloatingBarProps<TData> extends React.HTMLAttributes<HTMLElement> {
  table: Table<TData>;
  deleteRowsAction?: () => void;
}

export function SeatTypesTableFloatingBar<TData>({
  table,
  deleteRowsAction,
  className,
  ...props
}: DataTableFloatingBarProps<TData>) {
  if (table.getFilteredSelectedRowModel().rows.length <= 0) return null;

  return (
    <div
      className={cn(
        "mx-auto flex w-fit items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white",
        className
      )}
      {...props}
    >
      <Button
        aria-label="Clear selection"
        title="Clear"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={() => table.toggleAllRowsSelected(false)}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </Button>
      {table.getFilteredSelectedRowModel().rows.length} row(s) selected
      <Button
        aria-label="Change status of selected rows"
        title="Delete"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={() => {
          table.toggleAllPageRowsSelected(false);
          deleteRowsAction?.();
        }}
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
