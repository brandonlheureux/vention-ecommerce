import { ICart, IProduct } from '@ecommerce/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Cart', 'Products'],
  refetchOnReconnect: true,
  endpoints: (build) => ({
    // Products endpoints
    getProductsByPage: build.query<IProduct[], number | undefined>({
      query: (page = 1) => `products/?skip=${(page - 1) * 9}&limit=9`,
    }),
    // could add the review submission endpoint but not sure how to only invalidate a specific page..
    // or item if possible??

    // Cart endpoints
    getCart: build.query<ICart, void>({
      query: () => `cart/`,
      providesTags: ['Cart'],
    }),
    updateCartItem: build.mutation<ICart, { newCount: number; id: string }>({
      query: ({ newCount, id }) => ({
        url: `cart/${id}/?newCount=${newCount}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Cart'],
    }),
    addCartItem: build.mutation<ICart, IProduct>({
      query: (product) => ({
        url: `cart/`,
        method: 'PUT',
        body: { product: product },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCartItem: build.mutation<ICart, string>({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetProductsByPageQuery,
  useGetCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
  util,
} = api;
