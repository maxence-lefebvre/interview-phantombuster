import {
  useIsFetching,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { IPhantom } from '@phantombuster/phantoms/types';

export const PHANTOMS_QUERY_KEYS = {
  PHANTOMS: 'phantoms',
};

const handleInvalidateQueryError = (error: Error) => {
  console.error('Error invalidating query', error);
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

export const useIsFetchingPhantoms = () => {
  return (
    useIsFetching({
      queryKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
    }) > 0
  );
};

export const useRenamePhantomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      return fetch(`/api/phantoms/${encodeURI(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
        })
        .catch(handleInvalidateQueryError);
    },
  });
};

export const useDuplicatePhantomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
    mutationFn: async (id: string) => {
      return fetch(`/api/phantoms/${encodeURI(id)}/duplicate`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
        })
        .catch(handleInvalidateQueryError);
    },
  });
};

export const useDeletePhantomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
    mutationFn: async (id: string) => {
      return fetch(`/api/phantoms/${encodeURI(id)}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [PHANTOMS_QUERY_KEYS.PHANTOMS],
        })
        .catch(handleInvalidateQueryError);
    },
  });
};
