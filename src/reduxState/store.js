import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './currency/currencySlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const currencyPersistConfig = {
  key: 'currency',
  storage,
  whitelist: ['baseCurrency'],
};
const currencyPersistedReducer = persistReducer(
  currencyPersistConfig,
  currencyReducer,
);

export const store = configureStore({
  reducer: {
    currency: currencyPersistedReducer,
    // filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
