import {
  DropdownMenuItem,
  SheetTrigger,
} from '@phantombuster/design-system/components';

export const RenamePhantomMenuItem = () => {
  return (
    <SheetTrigger asChild>
      <DropdownMenuItem>
        <span>Rename</span>
      </DropdownMenuItem>
    </SheetTrigger>
  );
};
