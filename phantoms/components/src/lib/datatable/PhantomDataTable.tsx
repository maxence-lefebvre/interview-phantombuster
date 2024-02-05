import { ComponentPropsWithoutRef, useCallback } from 'react';

import {
  DataTable,
  DataTableColumnVisibility,
  DataTableFilter,
  DataTablePagination,
  useDataTable,
} from '@phantombuster/design-system/components';
import { useUrlState } from '@phantombuster/ext/react-router-dom/hooks';
import {
  useIsFetchingPhantoms,
  usePhantoms,
} from '@phantombuster/phantoms/state';

import { CategoriesSelectFilter } from './categories/CategoriesSelectFilter';
import { columns } from './columns';

export function PhantomDataTable({
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  const { data: phantoms } = usePhantoms();
  const isFetchingPhantoms = useIsFetchingPhantoms();
  const [categoryFilter, setCategoryFilter] = useUrlState('category');

  const table = useDataTable({
    columns,
    data: phantoms ?? [],
    ...(categoryFilter && {
      initialColumnFilters: [
        {
          id: 'categories',
          value: categoryFilter,
        },
      ],
    }),
  });

  const onChangeCategoryFilter = useCallback(
    (value?: string | null) => {
      setCategoryFilter(value ?? undefined);
    },
    [setCategoryFilter],
  );

  return (
    <DataTable
      dataTableFilter={
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <DataTableFilter
            columnId="name"
            placeholder="Search phantoms..."
            table={table}
          />
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <DataTableColumnVisibility table={table} />
            <CategoriesSelectFilter
              columnId="categories"
              onChangeFilter={onChangeCategoryFilter}
              table={table}
            />
          </div>
        </div>
      }
      dataTablePagination={<DataTablePagination table={table} />}
      isLoading={isFetchingPhantoms}
      noDataMessage="No phantoms."
      table={table}
      {...props}
    />
  );
}
