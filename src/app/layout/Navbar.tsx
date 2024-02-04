import { memo } from 'react';
import { Link } from 'react-router-dom';

import {
  ThemeSelect,
  UnstyledButton,
} from '@phantombuster/design-system/components';

import logo from './assets/logo.svg';
import { MainNav } from './MainNav';
import { UserDropdown } from './UserDropdown';

export const Navbar = memo(function Navbar() {
  return (
    <div className="flex h-16 items-center px-4">
      <Link to="/">
        <UnstyledButton>
          <img alt="the logo of phantombuster: a cute ghost" src={logo} />
        </UnstyledButton>
      </Link>
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <ThemeSelect />
        <UserDropdown />
      </div>
    </div>
  );
});
