import { HTMLAttributes } from 'react';

import { DataTable } from '@phantombuster/design-system/components';
import { usePhantoms } from '@phantombuster/phantoms/state';

import { columns } from './columns';

export const PhantomDataTable = ({
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { data: phantoms, isLoading } = usePhantoms();

  if (isLoading || !phantoms) {
    // TODO: add loading state
    return null;
  }

  return (
    <DataTable
      columns={columns}
      data={phantoms}
      noDataMessage="No phantoms."
      {...props}
    />
  );
};
