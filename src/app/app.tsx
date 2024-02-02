import { useEffect, useState } from 'react';

import { PhantomCard } from '@phantombuster/phantoms/components';
import { IPhantom } from '@phantombuster/phantoms/types';

export function App() {
  const [phantoms, setPhantoms] = useState<IPhantom[]>([]);

  useEffect(() => {
    fetch('/api/phantoms')
      .then((response) => response.json())
      .then((data) => setPhantoms(data.phantoms));
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      <section className="grid grid-flow-row-dense grid-cols-3 gap-8">
        {phantoms.map((phantom) => (
          <PhantomCard key={phantom.id} phantom={phantom} />
        ))}
      </section>
    </div>
  );
}
