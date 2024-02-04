import { Table } from '@tanstack/react-table';
import { ChangeEvent, useCallback } from 'react';
import { z } from 'zod';

import { Input } from '../../ui/input';

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  columnId: string;
  placeholder?: string;
}

export function DataTableFilter<TData>({
  table,
  columnId,
  placeholder = 'Filter data...',
}: DataTableFilterProps<TData>) {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      table.getColumn(columnId)?.setFilterValue(event.target.value);
    },
    [table, columnId]
  );

  const value = z
    .string()
    .optional()
    .catch('')
    .parse(table.getColumn(columnId)?.getFilterValue());

  return (
    <Input
      className="max-w-sm"
      onChange={onChange}
      placeholder={placeholder}
      value={value ?? ''}
    />
  );
}
