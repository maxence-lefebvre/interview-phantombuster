import useUrlState from '@ahooksjs/use-url-state';
import { HTMLAttributes, useCallback } from 'react';

import {
  DataTable,
  DataTableFilter,
  DataTablePagination,
  useDataTable,
} from '@phantombuster/design-system/components';
import {
  useIsFetchingPhantoms,
  usePhantoms,
} from '@phantombuster/phantoms/state';

import { CategoriesSelectFilter } from './categories/CategoriesSelectFilter';
import { columns } from './columns';

export type FilterSearchState = {
  category: string;
};

export const PhantomDataTable = ({
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { data: phantoms } = usePhantoms();
  const isFetchingPhantoms = useIsFetchingPhantoms();
  const [urlState, setUrlState] = useUrlState<FilterSearchState>();

  const table = useDataTable({
    columns,
    data: phantoms ?? [],
    ...(urlState.category && {
      initialColumnFilters: [
        {
          id: 'categories',
          value: urlState.category,
        },
      ],
    }),
  });

  const onChangeCategoryFilter = useCallback(
    (value?: string | null) => {
      setUrlState({ category: value ?? undefined });
    },
    [setUrlState]
  );

  return (
    <DataTable
      table={table}
      isLoading={isFetchingPhantoms}
      noDataMessage="No phantoms."
      dataTableFilter={
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <DataTableFilter
            placeholder="Search phantoms..."
            table={table}
            columnId="name"
          />
          <CategoriesSelectFilter
            table={table}
            columnId="categories"
            onChangeFilter={onChangeCategoryFilter}
          />
        </div>
      }
      dataTablePagination={<DataTablePagination table={table} />}
      {...props}
    />
  );
};
