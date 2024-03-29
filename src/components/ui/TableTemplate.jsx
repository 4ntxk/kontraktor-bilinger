/* eslint-disable react/prop-types */
import * as React from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { DataTableViewOptions } from "./DataTableViewOptions";

export function TableTemplate({ columns, data, actions }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns: [...columns, { id: "actions", header: " ", cell: actions }],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleAddContractor = () => {
    navigate("/addcontractor");
  };

  return (
    <>
      <div className="rounded-md text-mywhite w-2/3">
        <div className="flex items-center py-4 text-mywhite">
          <Input
            placeholder="Filter lastnames"
            value={table.getColumn("lastName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("lastName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-myblack"
          />
          <DataTableViewOptions table={table} />
        </div>
        <div>
          <Table className="rounded-md border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-mygray">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-2 flex justify-between">
          <Button
            onClick={handleAddContractor}
            size="sm"
            className="border text-white border-mywhite border-solid bg-mybrown hover:bg-myblack"
          >
            Add contractor
          </Button>
          <div>
            <Button
              className="border border-mywhite border-solid bg-myblack hover:bg-mygray"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              className="border border-mywhite border-solid bg-myblack hover:bg-mygray"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
