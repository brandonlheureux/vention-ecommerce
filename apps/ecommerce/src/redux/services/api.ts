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
    submitProductReview: build.mutation<
      IProduct[],
      { rating: number; id: string; page: number }
    >({
      query: ({ id, rating }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: { rating },
      }),
      async onQueryStarted({ rating, id, page }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getProductsByPage', page, (productPage) => {
            const index = productPage.findIndex(({ _id }) => id === _id);
            if (index < 0) this.invalidatesTags = ['Products'];
            const { avgRating, ratingCount } = productPage[index];
            productPage[index].avgRating =
              (avgRating * ratingCount + rating) / (ratingCount + 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Cart endpoints
    getCart: build.query<ICart, void>({
      query: () => `cart/`,
      providesTags: ['Cart'],
    }),
    updateCartItem: build.mutation<void, { newCount: number; id: string }>({
      query: ({ newCount, id }) => ({
        url: `cart/${id}/?newCount=${newCount}`,
        method: 'PATCH',
      }),
      // invalidatesTags: ['Cart'],
      async onQueryStarted({ newCount, id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCart', undefined, (draft) => {
            if (id in draft.list) {
              if (newCount === 0) {
                delete draft.list[id];
              } else {
                draft.list[id].count = newCount;
              }
            } else {
              this.invalidatesTags = ['Cart'];
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addCartItem: build.mutation<void, IProduct>({
      query: (product) => ({
        url: `cart/`,
        method: 'PUT',
        body: { product: product },
      }),
      // invalidatesTags: ['Cart'],
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCart', undefined, (draft) => {
            if (product._id in draft.list) {
              ++draft.list[product._id].count;
            } else {
              draft.list[product._id] = { ...product, count: 1 };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeCartItem: build.mutation<void, string>({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Cart'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCart', undefined, (draft) => {
            delete draft.list[id];
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsByPageQuery,
  useGetCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
  useSubmitProductReviewMutation,
  util,
} = api;
