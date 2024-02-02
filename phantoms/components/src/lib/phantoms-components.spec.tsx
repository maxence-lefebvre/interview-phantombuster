import { render } from '@testing-library/react';

import { PhantomsComponents } from './phantoms-components';

describe('PhantomsComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhantomsComponents />);
    expect(baseElement).toBeTruthy();
  });
});
