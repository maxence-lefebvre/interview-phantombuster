import { Fragment } from 'react';

import { ResetLocalCacheButton } from '@phantombuster/kernel/mock-server';
import {
  PhantomCount,
  PhantomDataTable,
} from '@phantombuster/phantoms/components';

export const DashboardPage = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-4">
          <PhantomCount />
          <ResetLocalCacheButton />
        </div>
      </div>
      <PhantomDataTable />
    </Fragment>
  );
};
