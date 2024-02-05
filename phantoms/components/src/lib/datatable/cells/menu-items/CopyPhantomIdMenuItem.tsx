import { useCallback } from 'react';

import {
  DropdownMenuItem,
  useToast,
} from '@phantombuster/design-system/components';
import { useClipboard } from '@phantombuster/ext/react/hooks';
import { IPhantom } from '@phantombuster/phantoms/types';

export type CopyPhantomIdMenuItemProps = {
  phantom: Pick<IPhantom, 'id'>;
};

export function CopyPhantomIdMenuItem({ phantom }: CopyPhantomIdMenuItemProps) {
  const { toast } = useToast();
  const { copy } = useClipboard();

  const onClickCopy = useCallback(() => {
    copy(phantom.id)
      .then(() =>
        toast({
          title: 'Copied!',
          description: `The id '${phantom.id}' has been copied to your clipboard.`,
        }),
      )
      .catch((error) =>
        toast({
          title: 'Oops!',
          description: `An error occurred while copying the id '${phantom.id}': ${error.message}`,
        }),
      );
  }, [copy, toast, phantom.id]);

  return <DropdownMenuItem onClick={onClickCopy}>Copy id</DropdownMenuItem>;
}
