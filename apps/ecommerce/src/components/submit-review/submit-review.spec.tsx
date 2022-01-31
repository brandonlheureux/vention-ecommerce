import { render } from '@testing-library/react';

import SubmitReview from './submit-review';

describe('SubmitReview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubmitReview />);
    expect(baseElement).toBeTruthy();
  });
});
