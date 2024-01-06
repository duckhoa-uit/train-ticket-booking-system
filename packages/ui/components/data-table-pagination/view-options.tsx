import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import type { Table } from "@tanstack/react-table";

import { Button } from "../button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "../form/dropdown";
import { Sliders } from "../icons";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

const transformColumnIdToName = (id: string) =>
  id
    .split(".")
    .map((_) => _.charAt(0).toUpperCase() + _.slice(1))
    .join(" ");

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <Button
          color="secondary"
          StartIcon={() => <Sliders className="mr-2 h-4 w-4" />}
          className="ml-auto hidden lg:flex"
        >
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  <DropdownItem>
                    {transformColumnIdToName(column.id)}
                  </DropdownItem>
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </Dropdown>
  );
}
