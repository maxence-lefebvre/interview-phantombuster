import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

export type RenamePhantomDialogContentProps = {
  phantom: Pick<IPhantom, 'id' | 'name'>;
};

export const RenamePhantomDialogContent = ({
  phantom,
}: RenamePhantomDialogContentProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  );
};
