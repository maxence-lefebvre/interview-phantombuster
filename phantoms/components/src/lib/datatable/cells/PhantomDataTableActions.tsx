import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

import { DeletePhantomMenuItem } from './menu-items/DeletePhantomMenuItem';

export type PhantomDataTableActionsProps = {
  row: Row<IPhantom>;
};

export const PhantomDataTableActions = ({
  row,
}: PhantomDataTableActionsProps) => {
  return (
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
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DeletePhantomMenuItem phantom={row.original} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
