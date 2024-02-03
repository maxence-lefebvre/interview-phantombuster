import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  Button,
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

import { CopyPhantomIdMenuItem } from './menu-items/CopyPhantomIdMenuItem';
import { DeletePhantomMenuItem } from './menu-items/DeletePhantomMenuItem';
import { DuplicatePhantomMenuItem } from './menu-items/DuplicatePhantomMenuItem';
import { RenamePhantomDialogContent } from './menu-items/rename-phantom/RenamePhantomDialogContent';
import { RenamePhantomMenuItem } from './menu-items/RenamePhantomMenuItem';

export type PhantomDataTableActionsProps = {
  row: Row<IPhantom>;
};

export const PhantomDataTableActions = ({
  row,
}: PhantomDataTableActionsProps) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <CopyPhantomIdMenuItem phantom={row.original} />
          <RenamePhantomMenuItem />
          <DuplicatePhantomMenuItem phantom={row.original} />
          <DeletePhantomMenuItem phantom={row.original} />
        </DropdownMenuContent>
      </DropdownMenu>
      <RenamePhantomDialogContent phantom={row.original} />
    </Dialog>
  );
};
