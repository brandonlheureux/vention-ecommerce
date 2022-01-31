import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface CartProps {}

const StyledCart = styled.div`
  color: pink;
`;

export function Cart(props: CartProps) {
  return (
    <StyledCart>
      <h1>Welcome to Cart!</h1>
    </StyledCart>
  );
}

export default Cart;
