import { faker } from '@faker-js/faker';
import { render, RenderOptions, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { z } from 'zod';

import { mockServer } from '@phantombuster/kernel/mock-server';
import { PhantomsContextProvider } from '@phantombuster/phantoms/state';
import { MockPhantomBuilder } from '@phantombuster/phantoms/testing/mocks';
import { IPhantom, zPhantom } from '@phantombuster/phantoms/types';

import { PhantomDataTable } from '../';

const TRIGGER_ID = 'phantom-actions-menu';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>
    <PhantomsContextProvider>{children}</PhantomsContextProvider>
  </MemoryRouter>
);

describe('RowActions', () => {
  let phantom: IPhantom;
  let server: ReturnType<typeof mockServer>;
  let user: ReturnType<typeof userEvent.setup>;

  let localStorageSpy: jest.SpyInstance;

  beforeEach(() => {
    phantom = MockPhantomBuilder.new().build();
    server = mockServer();
    server.create('phantom', phantom);

    localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
    // Disable localStorage cache
    Storage.prototype.getItem = jest.fn(() => null);
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

  const getPhantoms = () => {
    const map = z
      .record(z.string(), zPhantom)
      .parse(JSON.parse(localStorageSpy.mock.lastCall[1]));

    return Object.values(map);
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

      expect(getPhantoms()).toEqual([]);
    });
  });

  describe('Duplicate phantom', () => {
    it('should duplicate the phantom on click', async () => {
      setup(<PhantomDataTable />);

      await clickOnItem('make a copy');

      expect(getPhantoms()).toEqual([
        phantom,
        { ...phantom, id: expect.any(String) },
      ]);
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

      expect(getPhantoms()[0].name).toBe(newName);
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
