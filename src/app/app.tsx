import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { IPhantom } from '@phantombuster/phantoms/types';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export function App() {
  const [phantoms, setPhantoms] = useState<IPhantom[]>([]);

  useEffect(() => {
    fetch('/api/phantoms')
      .then((response) => response.json())
      .then((data) => setPhantoms(data.phantoms));
  }, []);

  return (
    <StyledApp>
      <h1>Phantoms</h1>
      <ul>
        {phantoms.map((phantom) => (
          <li key={phantom.id}>{phantom.name}</li>
        ))}
      </ul>
    </StyledApp>
  );
}
