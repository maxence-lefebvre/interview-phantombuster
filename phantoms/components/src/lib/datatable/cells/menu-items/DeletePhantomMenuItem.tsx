import { useCallback } from 'react';

import { DropdownMenuItem } from '@phantombuster/design-system/components';
import { useDeletePhantomMutation } from '@phantombuster/phantoms/state';
import { IPhantom } from '@phantombuster/phantoms/types';

export type DeletePhantomMenuItemProps = {
  phantom: Pick<IPhantom, 'id'>;
};

export function DeletePhantomMenuItem({ phantom }: DeletePhantomMenuItemProps) {
  const { mutate } = useDeletePhantomMutation();

  const onClickDelete = useCallback(
    () => mutate(phantom.id),
    [mutate, phantom.id]
  );

  return <DropdownMenuItem onClick={onClickDelete}>Delete</DropdownMenuItem>;
}
