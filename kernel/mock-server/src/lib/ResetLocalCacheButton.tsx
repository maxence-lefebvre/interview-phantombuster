import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Button } from '@phantombuster/design-system/components';

import { resetLocalStorageCache } from './local-storage-cache';

export const ResetLocalCacheButton = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: resetLocalStorageCache,
    onSuccess: () => {
      queryClient
        .invalidateQueries()
        .catch((error) => console.error('Failed to invalidate queries', error));
    },
  });

  const onClickResetLocalStorageCache = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <Button
      disabled={isPending}
      variant="outline"
      onClick={onClickResetLocalStorageCache}
      size="icon"
      title="Reset local storage cache"
    >
      {isPending ? (
        <ReloadIcon className="mr-2 size-4 animate-spin" />
      ) : (
        <TrashIcon className="size-4" />
      )}
    </Button>
  );
};
