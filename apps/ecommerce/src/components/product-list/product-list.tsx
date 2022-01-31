import { IProduct } from '@ecommerce/models';
import styled from '@emotion/styled';
import { Grid, Pagination } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Product from '../product/product';

export interface ProductListProps {
  products: IProduct[];
}

export function ProductList({ products = [] }: ProductListProps) {
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios
      .get('/api/products/pages')
      .then((res) => res.data)
      .then((data) => setPages(data.pages))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <StyledPagination
        count={pages}
        variant="outlined"
        shape="rounded"
        size="large"
      />
      <List
        container
        spacing={{ xs: 4, md: 6, xl: 8 }}
        justifyContent={'center'}
      >
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Product product={product} delay={index * 100} />
          </Grid>
        ))}
      </List>
    </>
  );
}

export default ProductList;

const List = styled(Grid)`
  padding: 2rem 0;
`;

const StyledPagination = styled(Pagination)`
  margin: 1rem auto;
  width: fit-content;
  position: sticky;
  top: 1rem;
  z-index: 10;
`;
