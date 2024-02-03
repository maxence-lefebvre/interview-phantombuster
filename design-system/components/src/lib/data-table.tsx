import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@phantombuster/design-system/core';

import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface DataTableProps<TData> extends HTMLAttributes<HTMLDivElement> {
  table: ReactTable<TData>;
  noDataMessage?: string;
  isLoading?: boolean;
  dataTableFilter?: ReactNode;
  dataTablePagination?: ReactNode;
}

export function DataTable<TData>({
  table,
  className,
  noDataMessage = 'No data',
  isLoading = false,
  dataTableFilter = null,
  dataTablePagination = null,
  ...props
}: DataTableProps<TData>) {
  return (
    <div>
      <div className="flex items-center py-4">{dataTableFilter}</div>
      <div className={cn('rounded-md border', className)} {...props}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="py-4"
                >
                  {/*
                   * FIXME: Skeleton makes it look like we are adding a row when deleting one also...
                   * Progress may be better
                   * Use XState to manage this
                   */}
                  <Skeleton className="h-4 w-[250px]" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                <TableCell colSpan={table.getAllColumns().length}>
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {dataTablePagination}
    </div>
  );
}
