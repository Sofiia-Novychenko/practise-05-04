import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency } from './operations';
import { exchangeCurrency } from '../../service/exchangeAPI';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrency.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.baseCurrency = payload;
      })
      .addCase(fetchBaseCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(exchangeCurrency.pending, state => {
        state.isLoading = true;
      })
      .addCase(exchangeCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.baseCurrency = payload;
      })
      .addCase(exchangeCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const currencyReducer = slice.reducer;
export const { setBaseCurrency } = slice.actions;
