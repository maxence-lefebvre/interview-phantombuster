import { Cross1Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useCallback } from 'react';
import { z } from 'zod';

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
    [table, columnId, onChangeFilter],
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

  const value = z
    .string()
    .optional()
    .catch('')
    .parse(table.getColumn(columnId)?.getFilterValue());

  /*
   * Note: A bug in radix-ui forces us to use a key on the Select component.
   * This is because the Select component does not re-render when the value changes.
   * When clearing the filter, the Select component does not update the value back to placeholder.
   *
   * @see https://github.com/radix-ui/primitives/issues/1569
   */
  return (
    <div className="flex items-center gap-2">
      <Select key={value} onValueChange={onSelectValueChange} value={value}>
        <SelectTrigger
          className="w-[180px] justify-between"
          data-testid="select-category-trigger"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent data-testid="select-category-list">
          {Array.from(categories.values()).map((category) => (
            <SelectItem key={category} value={category}>
              <span className="capitalize">{category}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        disabled={!value}
        onClick={onClickClear}
        size="icon"
        variant="outline"
        data-testid="clear-category-filter"
      >
        <Cross1Icon className="size-4" />
      </Button>
    </div>
  );
}
