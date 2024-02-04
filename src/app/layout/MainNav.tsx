import { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@phantombuster/design-system/core';

export function MainNav({
  className,
  ...props
}: ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav
      className={cn(
        'hidden mx-6 md:flex items-center space-x-4 lg:space-x-6',
        className
      )}
      {...props}
    >
      <Link
        className="text-sm font-medium transition-colors hover:text-primary"
        to="/dashboard"
      >
        Dashboard
      </Link>
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        to="/linkedin-leads"
      >
        LinkedIn leads
      </Link>
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        to="/solutions"
      >
        Solutions
      </Link>
    </nav>
  );
}
