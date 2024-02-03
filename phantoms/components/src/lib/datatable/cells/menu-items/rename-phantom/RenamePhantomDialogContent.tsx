import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@phantombuster/design-system/components';
import { useRenamePhantomMutation } from '@phantombuster/phantoms/state';
import { IPhantom } from '@phantombuster/phantoms/types';

const formSchema = z.object({
  name: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export type RenamePhantomDialogContentProps = {
  phantom: Pick<IPhantom, 'id' | 'name'>;
};

export const RenamePhantomDialogContent = ({
  phantom,
}: RenamePhantomDialogContentProps) => {
  const { mutate } = useRenamePhantomMutation();

  const renamePhantomForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: phantom.name,
    },
  });

  const onSubmit = useCallback(
    (values: FormSchema) => {
      return mutate({ id: phantom.id, name: values.name });
    },
    [mutate, phantom.id]
  );

  return (
    <DialogContent>
      <Form {...renamePhantomForm}>
        <form
          onSubmit={renamePhantomForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <DialogHeader>
            <DialogTitle>Rename phantom</DialogTitle>
            <DialogDescription>
              Choose a new name for your phantom.
              <br />
              Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={renamePhantomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phantom name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Fill your phantom name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We recommend that you include the linked vendor (e.g,
                    "LinkedIn") in the name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};