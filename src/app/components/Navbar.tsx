import logo from './assets/logo.svg';
import { MainNav } from './MainNav';
import { UserDropdown } from './UserDropdown';

export const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4">
      <img src={logo} alt="the logo of phantombuster: a cute ghost" />
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <UserDropdown />
      </div>
    </div>
  );
};
