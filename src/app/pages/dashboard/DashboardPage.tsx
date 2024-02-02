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
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <PhantomCount />
          </div>
        </div>
        <PhantomDataTable />
      </div>
    </div>
  );
};
