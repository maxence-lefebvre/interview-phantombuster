import { useQuery } from '@tanstack/react-query';

import { IPhantom } from '@phantombuster/phantoms/types';

export const PHANTOMS_QUERY_KEYS = {
  PHANTOMS: 'phantoms',
};

export const usePhantoms = () => {
  return useQuery({
    queryKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
    queryFn: async () => {
      return fetch('/api/phantoms')
        .then((response) => response.json())
        .then((data) => data.phantoms as IPhantom[]);
    },
  });
};
