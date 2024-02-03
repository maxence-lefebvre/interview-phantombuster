import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

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
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        to="/linkedin-leads"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        LinkedIn leads
      </Link>
      <Link
        to="/solutions"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Solutions
      </Link>
    </nav>
  );
};
