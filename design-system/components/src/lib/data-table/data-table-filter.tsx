import { Table } from '@tanstack/react-table';
import { ChangeEvent, useCallback } from 'react';

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

  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ''}
      onChange={onChange}
      className="max-w-sm"
    />
  );
}
