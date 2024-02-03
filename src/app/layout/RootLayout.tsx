import { Fragment, ReactNode } from 'react';

import { Toaster } from '@phantombuster/design-system/components';

import { Navbar } from './Navbar';

export type RootLayoutProps = {
  children: ReactNode;
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="border-b">
          <Navbar />
        </div>
        <div className="flex flex-1 flex-col gap-12 p-12">{children}</div>
      </div>
      <Toaster />
    </Fragment>
  );
};
