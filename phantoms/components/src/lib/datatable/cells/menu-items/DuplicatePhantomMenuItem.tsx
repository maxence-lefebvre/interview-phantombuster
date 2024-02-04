import { useCallback } from 'react';

import { DropdownMenuItem } from '@phantombuster/design-system/components';
import { useDuplicatePhantomMutation } from '@phantombuster/phantoms/state';
import { IPhantom } from '@phantombuster/phantoms/types';

export type DuplicatePhantomMenuItemProps = {
  phantom: Pick<IPhantom, 'id'>;
};

export function DuplicatePhantomMenuItem({
  phantom,
}: DuplicatePhantomMenuItemProps) {
  const { mutate } = useDuplicatePhantomMutation();

  const onClickDuplicate = useCallback(
    () => mutate(phantom.id),
    [mutate, phantom.id]
  );

  return (
    <DropdownMenuItem onClick={onClickDuplicate}>Make a copy</DropdownMenuItem>
  );
}
