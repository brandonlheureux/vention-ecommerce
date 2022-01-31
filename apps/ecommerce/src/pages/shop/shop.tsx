import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Pagination } from '@mui/material';

import { ProductList } from '../../components/product-list/product-list';
import Main from '../../layouts/main/main';
import styled from '@emotion/styled';

import { useGetProductsByPageQuery } from '../../redux/services/api';

/* eslint-disable-next-line */
export interface ShopProps {}

export function Shop(props: ShopProps) {
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetProductsByPageQuery(page);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // get page count
  useEffect(() => {
    axios
      .get('/api/products/pages')
      .then((res) => res.data)
      .then((data) => setPages(data.pages))
      .catch((error) => {
        console.log(error);
        // 🤷
      });
  }, []);

  // page changes gets new data
  useEffect(() => {
    console.log(products);
  }, [page, products]);

  return (
    <Main>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <StyledPagination
          count={pages}
          page={page}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={handlePageChange}
        />
        {isLoading || isFetching ? (
          <CircularProgress
            size={'5rem'}
            style={{
              margin: 'auto',
              display: 'block',
            }}
          />
        ) : (
          <ProductList products={products} />
        )}
      </Box>
    </Main>
  );
}

export default Shop;

const StyledPagination = styled(Pagination)`
  margin: 1rem auto;
  width: fit-content;
  position: sticky;
  top: 1rem;
  z-index: 10;
`;
