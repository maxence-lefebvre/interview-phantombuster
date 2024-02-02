import { render } from '@testing-library/react';

import PhantomsState from './phantoms-state';

describe('PhantomsState', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhantomsState />);
    expect(baseElement).toBeTruthy();
  });
});
