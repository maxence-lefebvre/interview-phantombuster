import { useEffect, useState } from 'react';

import { PhantomCard } from '@phantombuster/phantoms/components';
import { IPhantom } from '@phantombuster/phantoms/types';

import { Navbar } from './components/Navbar';

export function App() {
  const [phantoms, setPhantoms] = useState<IPhantom[]>([]);

  useEffect(() => {
    fetch('/api/phantoms')
      .then((response) => response.json())
      .then((data) => setPhantoms(data.phantoms));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <Navbar />
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {phantoms.length > 0 ? (
              <span className="text-sm font-medium text-gray-500">
                {phantoms.length} phantoms
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-500">
                Start with your first Phantom!
              </span>
            )}
          </div>
        </div>
        <section className="grid grid-flow-row-dense grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phantoms.map((phantom) => (
            <PhantomCard key={phantom.id} phantom={phantom} />
          ))}
        </section>
      </div>
    </div>
  );
}
