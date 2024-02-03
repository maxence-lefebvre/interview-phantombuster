import {
  DialogTrigger,
  DropdownMenuItem,
} from '@phantombuster/design-system/components';

export const RenamePhantomMenuItem = () => {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem>
        <span>Rename</span>
      </DropdownMenuItem>
    </DialogTrigger>
  );
};
