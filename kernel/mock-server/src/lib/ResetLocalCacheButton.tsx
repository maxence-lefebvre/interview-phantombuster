import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { useCallback } from 'react';

import { Button } from '@phantombuster/design-system/components';
import { useNonNullableContext } from '@phantombuster/ext/react/hooks';
import { PhantomsContext } from '@phantombuster/phantoms/state';

export function ResetLocalCacheButton() {
  const { resetPhantoms, isLoading } = useNonNullableContext(PhantomsContext);

  const onClickResetLocalStorageCache = useCallback(() => {
    resetPhantoms();
  }, [resetPhantoms]);

  return (
    <Button
      disabled={isLoading}
      onClick={onClickResetLocalStorageCache}
      size="icon"
      title="Reset local storage cache"
      variant="outline"
    >
      {isLoading ? (
        <ReloadIcon className="mr-2 size-4 animate-spin" />
      ) : (
        <TrashIcon className="size-4" />
      )}
    </Button>
  );
}
