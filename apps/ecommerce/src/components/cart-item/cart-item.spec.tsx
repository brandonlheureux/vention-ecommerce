import { render } from '@testing-library/react';

import CartItem from './cart-item';

describe('CartItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartItem />);
    expect(baseElement).toBeTruthy();
  });
});
