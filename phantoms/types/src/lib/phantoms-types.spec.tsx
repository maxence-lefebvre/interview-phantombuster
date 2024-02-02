import { render } from '@testing-library/react';

import PhantomsTypes from './phantoms-types';

describe('PhantomsTypes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhantomsTypes />);
    expect(baseElement).toBeTruthy();
  });
});
