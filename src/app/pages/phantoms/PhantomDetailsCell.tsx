import { ReactNode } from 'react';

import { Skeleton, TableCell } from '@phantombuster/design-system/components';

export type PhantomDetailsCellProps = {
  showSkeleton?: boolean;
  children?: ReactNode;
};

export function PhantomDetailsCell({
  showSkeleton = false,
  children = null,
}: PhantomDetailsCellProps) {
  return (
    <TableCell>
      {showSkeleton ? <Skeleton className="h-4 w-[250px]" /> : children}
    </TableCell>
  );
}
