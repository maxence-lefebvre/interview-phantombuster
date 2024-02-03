import { Fragment } from 'react';

import { ResetLocalCacheButton } from '@phantombuster/kernel/mock-server';
import {
  NextPhantomLaunchIn,
  PhantomCount,
  PhantomDataTable,
} from '@phantombuster/phantoms/components';

export const DashboardPage = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col gap-4 md:items-end">
          <NextPhantomLaunchIn />
          <div className="flex items-center gap-4">
            <PhantomCount />
            <ResetLocalCacheButton />
          </div>
        </div>
      </div>
      <PhantomDataTable />
    </Fragment>
  );
};
