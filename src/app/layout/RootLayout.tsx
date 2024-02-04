import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Toaster } from '@phantombuster/design-system/components';

import { Navbar } from './Navbar';

export function RootLayout() {
  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="border-b">
          <Navbar />
        </div>
        <div className="flex flex-1 flex-col gap-12 p-12">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
}
