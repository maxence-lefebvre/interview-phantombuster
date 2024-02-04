import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mockServer } from '@phantombuster/kernel/mock-server';
import { MockPhantomBuilder } from '@phantombuster/phantoms/testing/mocks';
import { IPhantom } from '@phantombuster/phantoms/types';

import { PhantomDataTable } from '../';

const TRIGGER_ID = 'phantom-actions-menu';
const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
);

describe('RowActions', () => {
  let phantom: IPhantom;
  let server: ReturnType<typeof mockServer>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    phantom = MockPhantomBuilder.new().build();
    server = mockServer();
    server.create('phantom', phantom);
  });

  afterEach(() => {
    server.shutdown();
  });

  const setup = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ) => {
    user = userEvent.setup();
    return render(ui, { wrapper: Wrapper, ...options });
  };

  const clickOnItem = async (label: string) => {
    const menu = await screen.findByTestId(TRIGGER_ID);
    await user.click(menu);

    const item = await screen.findByRole('menuitem', {
      name: new RegExp(label, 'i'),
    });
    await user.click(item);
  };

  describe('Delete phantom', () => {
    it('should delete the phantom on click', async () => {
      setup(<PhantomDataTable />);

      await clickOnItem('delete');

      expect(server.db.phantoms).toHaveLength(0);
    });
  });

  describe('Duplicate phantom', () => {
    it('should duplicate the phantom on click', async () => {
      setup(<PhantomDataTable />);

      await clickOnItem('make a copy');

      const [original, duplicate] = server.db.phantoms;

      expect(duplicate).toMatchObject({
        ...original,
        id: expect.any(String),
      });
    });
  });

  describe('Rename phantom', () => {
    it('should rename the phantom on submit', async () => {
      const newName = faker.lorem.sentence();

      setup(<PhantomDataTable />);

      await clickOnItem('rename');

      // Fill form
      const input = await screen.findByTestId('rename-phantom-input');
      await user.clear(input);
      await user.type(input, newName);
      await user.click(screen.getByTestId('rename-phantom-submit'));

      expect(server.db.phantoms[0].name).toBe(newName);
    });
  });

  describe('Copy phantom id', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(navigator.clipboard, 'writeText');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should copy the id to the clipboard', async () => {
      const phantomId = phantom.id;

      setup(<PhantomDataTable />);

      await clickOnItem('copy id');

      expect(spy).toHaveBeenCalledWith(phantomId);
    });
  });
});
