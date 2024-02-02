import { Skeleton } from '@phantombuster/design-system/components';
import { PhantomCard, PhantomCount } from '@phantombuster/phantoms/components';
import { usePhantoms } from '@phantombuster/phantoms/state';

import { Navbar } from './components/Navbar';

export const DashboardPage = () => {
  const { data: phantoms, isLoading } = usePhantoms();

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
        <section className="grid grid-flow-row-dense grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            [0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[155px] w-[290px] rounded-xl" />
            ))}
          {!isLoading &&
            !!phantoms &&
            phantoms.map((phantom) => (
              <PhantomCard key={phantom.id} phantom={phantom} />
            ))}
        </section>
      </div>
    </div>
  );
};
