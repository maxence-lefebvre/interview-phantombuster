import { HTMLAttributes } from 'react';

import { DataTable } from '@phantombuster/design-system/components';
import {
  useIsFetchingPhantoms,
  usePhantoms,
} from '@phantombuster/phantoms/state';

import { columns } from './columns';

export const PhantomDataTable = ({
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { data: phantoms } = usePhantoms();
  const isFetchingPhantoms = useIsFetchingPhantoms();

  return (
    <DataTable
      isLoading={isFetchingPhantoms}
      columns={columns}
      data={phantoms ?? []}
      noDataMessage="No phantoms."
      {...props}
    />
  );
};
