import { createColumnHelper } from '@tanstack/react-table';
import { addSeconds, format, formatDistanceToNow } from 'date-fns';

import {
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@phantombuster/design-system/components';
import { IPhantom } from '@phantombuster/phantoms/types';

import { PhantomDataTableActions } from './cells/PhantomDataTableActions';

const columnHelper = createColumnHelper<IPhantom>();

export const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  }),
  // columnHelper.accessor('script', {
  //   header: 'script',
  // }),
  columnHelper.accessor('launchType', {
    header: 'Launch type',
    // TODO: add fake "launch now" button
  }),
  columnHelper.display({
    id: 'launchFrequency',
    header: 'Frequency',
    cell: ({ row }) => {
      return row.original.repeatedLaunchTimes?.simplePreset ?? null;
    },
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
    enableColumnFilter: true,
    filterFn: (row, _, filterValue) => {
      return row.original.manifest.tags.categories.includes(filterValue);
    },
    cell: ({ row }) => row.original.manifest.tags.categories.join(' '),
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: ({ row }) => <PhantomDataTableActions row={row} />,
  }),
];
