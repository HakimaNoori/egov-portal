import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice";
import { baseApi } from "./services/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});