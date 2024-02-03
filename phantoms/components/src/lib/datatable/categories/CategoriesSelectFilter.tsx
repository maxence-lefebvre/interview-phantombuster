import { Cross1Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useCallback } from 'react';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@phantombuster/design-system/components';
import { usePhantomCategories } from '@phantombuster/phantoms/state';

export type CategoriesSelectFilterProps<TData> = {
  table: Table<TData>;
  columnId: string;
  placeholder?: string;
  onChangeFilter?: (value?: string | null) => void;
};

export function CategoriesSelectFilter<TData>({
  table,
  columnId = 'categories',
  placeholder = 'Select a category...',
  onChangeFilter,
}: CategoriesSelectFilterProps<TData>) {
  const { data: categories, isLoading } = usePhantomCategories();

  const onSelectValueChange = useCallback(
    (nextValue?: string | null) => {
      table.getColumn(columnId)?.setFilterValue(nextValue ?? '');
      onChangeFilter?.(nextValue);
    },
    [table, columnId, onChangeFilter]
  );

  const onClickClear = useCallback(() => {
    onSelectValueChange(null);
  }, [onSelectValueChange]);

  if (isLoading || !categories?.size) {
    return (
      <div className="py-2">
        <Skeleton className="h-4 w-[250px]" />
      </div>
    );
  }

  const value = (table.getColumn(columnId)?.getFilterValue() as string) ?? '';

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onSelectValueChange}>
        <SelectTrigger className="w-[180px] justify-between">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {Array.from(categories.values()).map((category) => (
            <SelectItem key={category} value={category}>
              <span className="capitalize">{category}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        disabled={!value}
        variant="outline"
        onClick={onClickClear}
        size="icon"
      >
        <Cross1Icon className="size-4" />
      </Button>
    </div>
  );
}
