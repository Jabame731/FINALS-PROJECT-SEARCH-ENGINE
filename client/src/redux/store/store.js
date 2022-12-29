import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../auth/authSlice';

import { webSearchAPI } from '../web-searchAPI/webSearchEngine';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [webSearchAPI.reducerPath]: webSearchAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSearchAPI.middleware),
});
