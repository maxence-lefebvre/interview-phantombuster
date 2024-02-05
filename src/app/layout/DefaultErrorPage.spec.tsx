import { render, screen } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';
import { vi } from 'vitest';

import { DefaultErrorPage } from './DefaultErrorPage';

vi.mock('react-router-dom');

const useRouteErrorMock = vi.mocked(useRouteError);

describe('DefaultErrorPage', () => {
  describe('when an error occurs', () => {
    it('should display status text over the error message', () => {
      useRouteErrorMock.mockReturnValue({
        statusText: 'Internal Server Error',
        message: 'This wont be displayed!',
      });

      render(<DefaultErrorPage />);

      expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/This wont be displayed/i),
      ).not.toBeInTheDocument();
    });

    it('should display the error message if there is no status text', () => {
      useRouteErrorMock.mockReturnValue({
        message: 'The server is on fire!',
      });

      render(<DefaultErrorPage />);

      expect(screen.getByText(/The server is on fire!/i)).toBeInTheDocument();
    });
  });
});
