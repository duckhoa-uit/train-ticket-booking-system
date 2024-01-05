"use client";

import { useMutation } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import type { SeatType } from "@ttbs/prisma";
import {
  DataTable,
  Button,
  DataTableColumnHeader,
  Checkbox,
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownItem,
} from "@ttbs/ui";
import { MoreHorizontal } from "@ttbs/ui/components/icons";

import { delete_ } from "@/lib/common/fetch";

import { SeatTypesTableFloatingBar } from "./seat-types-table-floating-bar";

interface SeatTypesTableProps {
  data: SeatType[];
  pageCount: number;
}

export function SeatTypesTable({ data, pageCount }: SeatTypesTableProps) {
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);

  const deleteSeatTypesMutation = useMutation({
    mutationFn: (id: number) => delete_(`${env.NEXT_PUBLIC_API_BASE_URI}/api/seat-types/${id}`),
  });

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<SeatType, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds((prev) => (prev.length === data.length ? [] : data.map((row) => row.id)));
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedRowIds((prev) =>
                value ? [...prev, row.original.id] : prev.filter((id) => id !== row.original.id)
              );
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => <div className="w-[160px]">{row.getValue("name")}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "floors",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Num Of. Floors" />,
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate text-center font-medium">{row.getValue("floors")}</span>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "seatsPerRow",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Seats per Row" />,
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate text-center font-medium">
            {row.getValue("seatsPerRow")}
          </span>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Dropdown>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="icon"
                color="minimal"
                className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>
                <DropdownItem>Edit</DropdownItem>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false);

                    toast.promise(deleteSeatTypesMutation.mutateAsync(row.original.id), {
                      loading: "Deleting...",
                      success: () => "Seat type deleted successfully.",
                      error: (err: unknown) => {
                        console.log("🚀 ~ file: stations-table.tsx:128 ~ toast.promise ~ err:", err);
                        return "Something has error";
                      },
                    });
                  });
                }}
              >
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </Dropdown>
        ),
      },
    ],
    [data, isPending]
  );

  function deleteSelectedRows() {
    toast.promise(Promise.all(selectedRowIds.map((id) => deleteSeatTypesMutation.mutateAsync(id))), {
      loading: "Deleting...",
      success: () => {
        setSelectedRowIds([]);
        return "Stations deleted successfully.";
      },
      error: (err: unknown) => {
        console.log("🚀 ~ file: stations-table.tsx:151 ~ toast.promise ~ err:", err);
        setSelectedRowIds([]);
        return "Something has error.";
      },
    });
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      // Render notion like filters
      advancedFilter={false}
      // Render dynamic faceted filters
      // filterableColumns={[
      //   {
      //     id: "status",
      //     title: "Status",
      //     options: some-enum.map((status) => ({
      //       label: status[0]?.toUpperCase() + status.slice(1),
      //       value: status,
      //     })),
      //   },
      // ]}
      // Render dynamic searchable filters
      searchableColumns={[
        {
          id: "code",
          title: "Code",
        },
        {
          id: "name",
          title: "Name",
        },
      ]}
      // Render floating filters at the bottom of the table on column selection
      floatingBar={(table) => (
        <SeatTypesTableFloatingBar table={table} deleteRowsAction={deleteSelectedRows} />
      )}
    />
  );
}
