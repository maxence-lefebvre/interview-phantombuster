import { CopyButton, UnstyledButton } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';
import { addSeconds, format, formatDistanceToNow } from 'date-fns';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

const columnHelper = createColumnHelper<IPhantom>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'name',
    cell: ({ row, getValue }) => (
      <CopyButton value={row.original.id}>
        {({ copied, copy }) => (
          <UnstyledButton onClick={copy}>
            {copied ? 'id copied to clipboard' : getValue()}
          </UnstyledButton>
        )}
      </CopyButton>
    ),
  }),
  columnHelper.display({
    id: 'nextLaunchIn',
    header: 'Next Launch',
    cell: ({ row }) => {
      const value = row.original.nextLaunchIn;

      if (!value) {
        return null;
      }

      const nextLaunch = addSeconds(new Date(), value);

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{formatDistanceToNow(nextLaunch)}</TooltipTrigger>
            <TooltipContent>{format(nextLaunch, 'Pp')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  }),
  columnHelper.display({
    id: 'categories',
    header: 'categories',
    cell: ({ row }) => row.original.manifest.tags.categories.join(', '),
  }),
];
