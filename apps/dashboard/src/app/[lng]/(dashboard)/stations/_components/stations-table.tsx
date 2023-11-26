"use client";

import { useMutation } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { toast } from "sonner";

import type { Station } from "@ttbs/prisma";
import {
  DataTable,
  Button,
  DataTableColumnHeader,
  Checkbox,
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@ttbs/ui";
import { MoreHorizontal } from "@ttbs/ui/components/icons";

import { delete_ } from "@/lib/common/fetch";

import { StationsTableFloatingBar } from "./stations-table-floating-bar";

interface StationsTableProps {
  data: Station[];
  pageCount: number;
}

export function StationsTable({ data, pageCount }: StationsTableProps) {
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);

  const deleteStationMutation = useMutation({
    mutationFn: (id: number) => delete_(`http://localhost:8081/api/trains/${id}`),
  });

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Station, unknown>[]>(
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
        accessorKey: "code",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
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
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" className="text-left" />
        ),
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue("description")}</span>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      // {
      //   accessorKey: "priority",
      //   header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
      //   cell: ({ row }) => {
      //     const priority = tasks.priority.enumValues.find((priority) => priority === row.original.priority);

      //     if (!priority) {
      //       return null;
      //     }

      //     return (
      //       <div className="flex items-center">
      //         {priority === "low" ? (
      //           <ArrowDownIcon className="text-muted-foreground mr-2 h-4 w-4" aria-hidden="true" />
      //         ) : priority === "medium" ? (
      //           <ArrowRightIcon className="text-muted-foreground mr-2 h-4 w-4" aria-hidden="true" />
      //         ) : priority === "high" ? (
      //           <ArrowUpIcon className="text-muted-foreground mr-2 h-4 w-4" aria-hidden="true" />
      //         ) : (
      //           <CircleIcon className="text-muted-foreground mr-2 h-4 w-4" aria-hidden="true" />
      //         )}
      //         <span className="capitalize">{priority}</span>
      //       </div>
      //     );
      //   },
      //   filterFn: (row, id, value) => {
      //     return value instanceof Array && value.includes(row.getValue(id));
      //   },
      // },
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

            <DropdownMenuPortal>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    startTransition(() => {
                      row.toggleSelected(false);

                      toast.promise(deleteStationMutation.mutateAsync(row.original.id), {
                        loading: "Deleting...",
                        success: () => "Station deleted successfully.",
                        error: (err: unknown) => {
                          console.log("🚀 ~ file: stations-table.tsx:128 ~ toast.promise ~ err:", err);
                          return "Something has error";
                        },
                      });
                    });
                  }}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </Dropdown>
        ),
      },
    ],
    [data, isPending]
  );

  function deleteSelectedRows() {
    toast.promise(Promise.all(selectedRowIds.map((id) => deleteStationMutation.mutateAsync(id))), {
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
        <StationsTableFloatingBar table={table} deleteRowsAction={deleteSelectedRows} />
      )}
    />
  );
}
