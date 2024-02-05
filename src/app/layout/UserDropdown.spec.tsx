import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { UserDropdown } from './UserDropdown';

describe('UserDropdown', () => {
  it('should display the user email', async () => {
    const user = userEvent.setup();
    render(<UserDropdown />);

    const button = await screen.findByRole('button');
    await user.click(button);

    const email = await screen.findByText('zuul@gozer.com');
    expect(email).toBeInTheDocument();
  });
});
