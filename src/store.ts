import { configureStore } from '@reduxjs/toolkit';
import { clientsApi } from './services/clientsApi';

export const store = configureStore({
  reducer: {

    [clientsApi.reducerPath]: clientsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientsApi.middleware),
});