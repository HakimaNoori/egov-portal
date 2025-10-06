import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice";
import { baseApiSlice } from "./services/baseApiSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApiSlice.middleware),
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const persistor = persistStore(store);

export default store;