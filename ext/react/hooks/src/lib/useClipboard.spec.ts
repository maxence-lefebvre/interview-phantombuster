import { faker } from '@faker-js/faker';
import '@testing-library/user-event';
import { renderHook } from '@testing-library/react';

import { useClipboard } from './useClipboard';

describe('useClipboard', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        ...navigator.clipboard,
        writeText: jest.fn(),
      },
    });
  });

  beforeEach(() => {
    spy = jest.spyOn(navigator.clipboard, 'writeText');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should copy the given value to the clipboard', () => {
    const value = faker.lorem.text();
    const { result } = renderHook(() => useClipboard());

    result.current.copy(value);
    expect(spy).toHaveBeenCalledWith(value);
  });
});
