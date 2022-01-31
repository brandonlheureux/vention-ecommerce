// Need to use the React-specific entry point to import createApi
import { IProduct } from '@ecommerce/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (build) => ({
    getProductsByPage: build.query<IProduct[], number | undefined>({
      query: (page = 1) => `products/?skip=${(page - 1) * 9}&limit=9`,
    }),
  }),
});

export const { useGetProductsByPageQuery, util } = api;
