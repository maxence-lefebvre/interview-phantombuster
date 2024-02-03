import { Link } from 'react-router-dom';

import { UnstyledButton } from '@phantombuster/design-system/components';

import logo from './assets/logo.svg';
import { MainNav } from './MainNav';
import { UserDropdown } from './UserDropdown';

export const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4">
      <Link to="/">
        <UnstyledButton>
          <img src={logo} alt="the logo of phantombuster: a cute ghost" />
        </UnstyledButton>
      </Link>
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <UserDropdown />
      </div>
    </div>
  );
};
