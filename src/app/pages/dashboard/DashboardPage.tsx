import { Fragment } from 'react';

import {
  PhantomCount,
  PhantomDataTable,
} from '@phantombuster/phantoms/components';

export const DashboardPage = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <PhantomCount />
      </div>
      <PhantomDataTable />
    </Fragment>
  );
};
