import { IProduct } from '@ecommerce/models';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ProductsState {
  [page: number]: IProduct[];
}

// Define the initial state using that type
const initialState: ProductsState = {
  1: [],
};

export const productsSlice = createSlice({
  name: 'products',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default productsSlice.reducer;
