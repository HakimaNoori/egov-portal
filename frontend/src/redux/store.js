import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice";
import { baseApiSlice } from "./services/baseApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
});

export default store;