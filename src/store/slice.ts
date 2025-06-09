import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../core/interceptor';
import type { Product } from '../Pages/features/dashboard/dashboard.schema';

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page, pageSize }: { page: number; pageSize: number }) => {
  const response = await api.get(`/products?limit=${pageSize}&offset=${page}`);
  // Adjust according to your API response structure
  return {
    products: response.data,
    total: 200, // Replace with response.data.total if available
  };
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Product[]; total: number }>) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
