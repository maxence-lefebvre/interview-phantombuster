import { useEffect, useState } from 'react';

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
      <h1>Phantoms</h1>
      <ul>
        {phantoms.map((phantom) => (
          <li key={phantom.id}>{phantom.name}</li>
        ))}
      </ul>
    </div>
  );
}
