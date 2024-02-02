import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useDeletePhantomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
    mutationFn: async (id: string) => {
      return fetch(`/api/phantoms/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
        })
        .catch((error) => console.error('Error invalidating query', error));
    },
  });
};
