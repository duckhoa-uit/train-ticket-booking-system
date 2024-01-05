"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "../button";
import { Input } from "../form/inputs/TextField";
import { X } from "../icons";
import { DataTableFacetedFilter } from "./faceted-filter";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "./types";
import { DataTableViewOptions } from "./view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  placeholder={`Search ${column.title}...`}
                  value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn(String(column.id))?.setFilterValue(event.target.value)}
                  className="mb-0 w-[150px] lg:w-[250px]"
                />
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            EndIcon={() => <X className="ml-2 h-4 w-4" />}
            onClick={() => table.resetColumnFilters()}
            className=" px-2 pb-2 lg:px-3"
          >
            Reset
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
