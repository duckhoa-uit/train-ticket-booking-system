import type { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { cn } from "@ttbs/lib/cn";
import { useDebounce } from "@ttbs/lib/hooks";

import { Button } from "../../button";
import { Input } from "../../form/inputs/TextField";
import { TrashIcon } from "../../icons";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import {
  RadixSelect,
  RadixSelectContent,
  RadixSelectGroup,
  RadixSelectItem,
  RadixSelectTrigger,
  RadixSelectValue,
} from "../../radix-select";
import { DataTableFacetedFilter } from "../faceted-filter";
import type { DataTableFilterOption } from "../types";

interface DataTableAdvancedFilterItemProps<TData> {
  table: Table<TData>;
  selectedOption: DataTableFilterOption<TData>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<DataTableFilterOption<TData>[]>>;
}

export function DataTableAdvancedFilterItem<TData>({
  table,
  selectedOption,
  setSelectedOptions,
}: DataTableAdvancedFilterItemProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState("");
  const debounceValue = useDebounce(value, 500);
  const [open, setOpen] = React.useState(true);

  const selectedValues =
    selectedOption.items.length > 0
      ? Array.from(new Set(table.getColumn(String(selectedOption.value))?.getFilterValue() as string[]))
      : [];

  const filterVarieties =
    selectedOption.items.length > 0 ? ["is", "is not"] : ["contains", "does not contain", "is", "is not"];

  const [filterVariety, setFilterVariety] = React.useState(filterVarieties[0]);

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  React.useEffect(() => {
    if (debounceValue.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOption.value]: `${debounceValue}${debounceValue.length > 0 ? `.${filterVariety}` : ""}`,
        })}`,
        {
          scroll: false,
        }
      );
    }

    if (debounceValue.length === 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOption.value]: null,
        })}`,
        {
          scroll: false,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, filterVariety, selectedOption.value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          color="secondary"
          size="sm"
          className={cn(
            "h-7 truncate rounded-full",
            (selectedValues.length > 0 || value.length > 0) && "bg-muted/50"
          )}
        >
          {value.length > 0 || selectedValues.length > 0 ? (
            <>
              <span className="font-medium capitalize">{selectedOption.label}:</span>
              {selectedValues.length > 0 ? (
                <span className="ml-1">
                  {selectedValues.length > 2
                    ? `${selectedValues.length} selected`
                    : selectedValues.join(", ")}
                </span>
              ) : (
                <span className="ml-1">{value}</span>
              )}
            </>
          ) : (
            <span className="capitalize">{selectedOption.label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 space-y-1 text-xs" align="start">
        <div className="flex items-center space-x-1">
          <div className="flex flex-1 items-center space-x-1">
            <div className="capitalize">{selectedOption.label}</div>
            <RadixSelect onValueChange={(value) => setFilterVariety(value)}>
              <RadixSelectTrigger className="hover:bg-muted/50 h-auto w-fit truncate border-none px-2 py-0.5">
                <RadixSelectValue placeholder={filterVarieties[0]} />
              </RadixSelectTrigger>
              <RadixSelectContent>
                <RadixSelectGroup>
                  {filterVarieties.map((variety) => (
                    <RadixSelectItem key={variety} value={variety}>
                      {variety}
                    </RadixSelectItem>
                  ))}
                </RadixSelectGroup>
              </RadixSelectContent>
            </RadixSelect>
          </div>
          <Button
            aria-label="Remove filter"
            variant="icon"
            color="minimal"
            className="h-8 w-8"
            onClick={() => {
              router.push(
                `${pathname}?${createQueryString({
                  [selectedOption.value]: null,
                })}`,
                {
                  scroll: false,
                }
              );
              setSelectedOptions((prev) => prev.filter((item) => item.value !== selectedOption.value));
            }}
          >
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        {selectedOption.items.length > 0 ? (
          table.getColumn(selectedOption.value ? String(selectedOption.value) : "") && (
            <DataTableFacetedFilter
              key={String(selectedOption.value)}
              column={table.getColumn(selectedOption.value ? String(selectedOption.value) : "")}
              title={selectedOption.label}
              options={selectedOption.items}
              variant="command"
            />
          )
        ) : (
          <Input
            placeholder="Type here..."
            className="h-8"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
