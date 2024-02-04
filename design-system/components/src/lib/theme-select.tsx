import { FaceIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useCallback } from 'react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { useTheme } from './theme-provider';

export function ThemeSelect() {
  const { setTheme } = useTheme();

  const onClickSetLightTheme = useCallback(() => setTheme('light'), [setTheme]);

  const onClickSetDarkTheme = useCallback(() => setTheme('dark'), [setTheme]);

  const onClickSetSystemTheme = useCallback(
    () => setTheme('system'),
    [setTheme]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={onClickSetLightTheme}
        >
          <SunIcon />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={onClickSetDarkTheme}
        >
          <MoonIcon />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={onClickSetSystemTheme}
        >
          <FaceIcon />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
