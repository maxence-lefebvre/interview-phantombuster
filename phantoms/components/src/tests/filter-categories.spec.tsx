import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mockServer } from '@phantombuster/kernel/mock-server';
import { MockPhantomBuilder } from '@phantombuster/phantoms/testing/mocks';

import { PhantomDataTable } from '../lib/datatable/PhantomDataTable';

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
);

describe('Filter by Categories', () => {
  let server: ReturnType<typeof mockServer>;
  let user: ReturnType<typeof userEvent.setup>;

  // FIXME: radix is using a method not implemnted by jsdom
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();

  beforeEach(() => {
    server = mockServer();
    server.create(
      'phantom',
      MockPhantomBuilder.new()
        .with('manifest', {
          tags: { categories: ['linkedin', 'mail'] },
        })
        .build(),
    );
    server.create(
      'phantom',
      MockPhantomBuilder.new()
        .with('manifest', {
          tags: { categories: ['linkedin', 'phone'] },
        })
        .build(),
    );
    server.create(
      'phantom',
      MockPhantomBuilder.new()
        .with('manifest', {
          tags: { categories: ['instagram', 'mail'] },
        })
        .build(),
    );
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

  const openDropdown = async () => {
    const select = await screen.findByTestId('select-category-trigger');
    await user.click(select);

    return screen.findByTestId('select-category-list');
  };

  it('should contain all categories', async () => {
    const EXPECTED_CATEGORIES = ['linkedin', 'mail', 'phone', 'instagram'];

    setup(<PhantomDataTable />);

    const dropdown = await openDropdown();
    const items = await within(dropdown).findAllByRole('option');

    expect(items.map((item) => item.textContent)).toEqual(EXPECTED_CATEGORIES);
  });

  it.each([
    ['linkedin', 2],
    ['mail', 2],
    ['phone', 1],
    ['instagram', 1],
  ] as const)(
    'should filter rows by the selected category (%s: %s rows) and update the URL',
    async (category, expectedRowsCount) => {
      setup(<PhantomDataTable />);

      const dropdown = await openDropdown();
      const item = await within(dropdown).findByRole('option', {
        name: category,
      });
      await user.click(item);

      // 0 is thead
      const tbody = screen.getAllByRole('rowgroup')[1];

      expect(within(tbody).getAllByRole('row')).toHaveLength(expectedRowsCount);
      // should have set the category in the URL
      expect(window.location.search).toContain(`category=${category}`);
    },
  );

  it('should allow to clear the filter and remove the param from the URL', async () => {
    setup(<PhantomDataTable />);

    const dropdown = await openDropdown();
    const item = await within(dropdown).findByRole('option', {
      name: 'linkedin',
    });

    await user.click(item);

    const clearButton = await screen.findByTestId('clear-category-filter');
    await user.click(clearButton);

    // 0 is thead
    const tbody = screen.getAllByRole('rowgroup')[1];

    expect(within(tbody).getAllByRole('row')).toHaveLength(3);
    // should have removed the category from the URL
    expect(window.location.search).not.toContain('category=');
  });
});
