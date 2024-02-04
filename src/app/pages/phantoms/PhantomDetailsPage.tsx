import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import {
  Button,
  Countdown,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@phantombuster/design-system/components';
import { usePhantom } from '@phantombuster/phantoms/state';
import { getNextLaunchDate } from '@phantombuster/phantoms/types';

import { PhantomDetailsCell } from './PhantomDetailsCell';

export const PhantomDetailsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('No id provided');
  }

  const { data, isLoading } = usePhantom(id);

  const showSkeleton = isLoading || !data;
  const nextLaunchDate = getNextLaunchDate(data?.nextLaunchIn);

  return (
    <Fragment>
      <Helmet>
        {isLoading || !data ? (
          <title>Loading Phantom Details</title>
        ) : (
          <title>{data.name}</title>
        )}
      </Helmet>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Link to="/dashboard" className="text-primary">
          <Button variant="ghost" size="icon" title="Back to dashboard">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Phantom Details</h2>
      </div>
      <Table className="md:w-1/2">
        <TableBody>
          {(['name', 'script', 'launchType'] as const).map((key) => (
            <TableRow key={key}>
              <TableHead className="capitalize">{key}</TableHead>
              <PhantomDetailsCell showSkeleton={showSkeleton}>
                {data?.[key] ?? null}
              </PhantomDetailsCell>
            </TableRow>
          ))}
          <TableRow>
            <TableHead>Launch frequency</TableHead>
            <PhantomDetailsCell showSkeleton={showSkeleton}>
              {data?.repeatedLaunchTimes?.simplePreset ?? null}
            </PhantomDetailsCell>
          </TableRow>
          <TableRow>
            <TableHead>Next Launch In</TableHead>
            <PhantomDetailsCell showSkeleton={showSkeleton}>
              {!!nextLaunchDate && <Countdown targetDate={nextLaunchDate} />}
            </PhantomDetailsCell>
          </TableRow>
          <TableRow>
            <TableHead>Categories</TableHead>
            <PhantomDetailsCell showSkeleton={showSkeleton}>
              {data?.manifest.tags.categories.join(', ') ?? null}
            </PhantomDetailsCell>
          </TableRow>
        </TableBody>
      </Table>
    </Fragment>
  );
};
