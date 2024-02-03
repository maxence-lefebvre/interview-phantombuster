import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import {
  Button,
  Countdown,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@phantombuster/design-system/components';
import { usePhantom } from '@phantombuster/phantoms/state';
import { getNextLaunchDate } from '@phantombuster/phantoms/types';

export const PhantomDetailsPage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error('No id provided');
  }

  const { data, isLoading } = usePhantom(id);

  const nextLaunchDate = getNextLaunchDate(data?.nextLaunchIn);

  // FIXME: There is probably a better way to handle the loading state here but it is getting late.
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
      <Table className="md:w-1/4">
        <TableBody>
          {(['name', 'script', 'launchType'] as const).map((key) => (
            <TableRow key={key}>
              <TableHead>{key}</TableHead>
              <TableCell>
                {isLoading || !data ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  data[key]
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableHead>Launch frequency</TableHead>
            <TableCell>
              {isLoading || !data ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                data.repeatedLaunchTimes?.simplePreset ?? null
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Next Launch In</TableHead>
            <TableCell>
              {isLoading || !data ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                nextLaunchDate && <Countdown targetDate={nextLaunchDate} />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Categories</TableHead>
            <TableCell>
              {isLoading || !data ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                data.manifest.tags.categories.join(', ')
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Fragment>
  );
};
