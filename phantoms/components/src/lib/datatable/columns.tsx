import { ExternalLinkIcon, PlayIcon } from '@radix-ui/react-icons';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import {
  Button,
  Countdown,
  DataTableColumnHeader,
} from '@phantombuster/design-system/components';
import { getNextLaunchDate, IPhantom } from '@phantombuster/phantoms/types';

import { PhantomDataTableActions } from './cells/PhantomDataTableActions';

const columnHelper = createColumnHelper<IPhantom>();

export const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, getValue }) => (
      <Link
        className="flex items-center gap-4"
        target="_blank"
        to={`/phantoms/${row.original.id}`}
      >
        <ExternalLinkIcon className="size-4 flex-none" />
        {getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('script', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Script" />
    ),
  }),
  columnHelper.accessor('launchType', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Launch Type" />
    ),
    cell: ({ getValue }) => (
      <span className="flex items-center gap-4">
        <Button size="icon" title="Launch now!" variant="outline">
          <PlayIcon className="size-4" />
        </Button>
        {getValue()}
      </span>
    ),
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
      const nextLaunch = getNextLaunchDate(row.original.nextLaunchIn);

      return nextLaunch ? <Countdown targetDate={nextLaunch} /> : null;
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
