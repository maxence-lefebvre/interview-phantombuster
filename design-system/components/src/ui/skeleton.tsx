import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@phantombuster/design-system/core';

function Skeleton({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}

export { Skeleton };
