import { render } from '@testing-library/react';

import { DesignSystemComponents } from './design-system-components';

describe('DesignSystemComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesignSystemComponents />);
    expect(baseElement).toBeTruthy();
  });
});
