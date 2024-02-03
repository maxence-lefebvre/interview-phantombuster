import { HTMLAttributes } from 'react';

import { cn } from '@phantombuster/design-system/core';

export const MainNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn(
        'hidden mx-6 md:flex items-center space-x-4 lg:space-x-6',
        className
      )}
      {...props}
    >
      <a
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </a>
      <a
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        LinkedIn leads
      </a>
      <a
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Solutions
      </a>
    </nav>
  );
};
