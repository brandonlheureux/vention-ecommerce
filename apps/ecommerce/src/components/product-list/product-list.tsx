import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ProductListProps {}

const StyledProductList = styled.div`
  color: pink;
`;

export function ProductList(props: ProductListProps) {
  return (
    <StyledProductList>
      <h1>Welcome to ProductList!</h1>
    </StyledProductList>
  );
}

export default ProductList;
