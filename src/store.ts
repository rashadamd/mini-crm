import { configureStore } from '@reduxjs/toolkit';
import { clientsApi } from './services/clientsApi';

export const store = configureStore({
  reducer: {
    [clientsApi.reducerPath]: clientsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientsApi.middleware),
});