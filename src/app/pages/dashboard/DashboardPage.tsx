import {
  PhantomCount,
  PhantomDataTable,
} from '@phantombuster/phantoms/components';

import { Navbar } from './components/Navbar';

export const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <div className="border-b">
        <Navbar />
      </div>
      <div className="flex flex-1 flex-col gap-12 p-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <PhantomCount />
        </div>
        <PhantomDataTable />
      </div>
    </div>
  );
};
