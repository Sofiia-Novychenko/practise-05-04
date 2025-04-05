// src/redux/operations.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchAll',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;
    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We aleredy have base currency!');
    }
    try {
      const data = await getUserInfo(coords);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
