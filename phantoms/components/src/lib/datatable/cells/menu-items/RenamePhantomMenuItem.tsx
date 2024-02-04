import {
  DropdownMenuItem,
  SheetTrigger,
} from '@phantombuster/design-system/components';

export function RenamePhantomMenuItem() {
  return (
    <SheetTrigger asChild>
      <DropdownMenuItem>
        <span>Rename</span>
      </DropdownMenuItem>
    </SheetTrigger>
  );
}
