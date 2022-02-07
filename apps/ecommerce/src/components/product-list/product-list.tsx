import { IProduct } from '@ecommerce/models';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import Product from '../product/product';

export interface ProductListProps {
  products: IProduct[];
  page: number;
}

export function ProductList({ products = [], page }: ProductListProps) {
  return (
    <List container spacing={{ xs: 4, md: 6, xl: 8 }} justifyContent={'center'}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Product product={product} delay={index * 100} page={page} />
        </Grid>
      ))}
    </List>
  );
}

export default ProductList;

const List = styled(Grid)`
  padding: 2rem 0;
`;
