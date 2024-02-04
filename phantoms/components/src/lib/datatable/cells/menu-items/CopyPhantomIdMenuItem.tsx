import { useClipboard } from '@mantine/hooks';
import { useCallback } from 'react';

import {
  DropdownMenuItem,
  useToast,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

export type CopyPhantomIdMenuItemProps = {
  phantom: Pick<IPhantom, 'id'>;
};

export function CopyPhantomIdMenuItem({ phantom }: CopyPhantomIdMenuItemProps) {
  const { toast } = useToast();
  const { copy } = useClipboard();

  const onClickCopy = useCallback(() => {
    copy(phantom.id);
    toast({
      title: 'Copied!',
      description: `The id '${phantom.id}' has been copied to your clipboard.`,
    });
  }, [copy, toast, phantom.id]);

  return <DropdownMenuItem onClick={onClickCopy}>Copy id</DropdownMenuItem>;
}
