import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Fade, Pagination } from '@mui/material';

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
    refetch,
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
      <Fade timeout={300} in={true}>
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
            <ProductList products={products} refetch={refetch} />
          )}
        </Box>
      </Fade>
    </Main>
  );
}

export default Shop;

const StyledPagination = styled(Pagination)`
  margin: 1rem auto;
  width: fit-content;
  top: 1rem;
`;
