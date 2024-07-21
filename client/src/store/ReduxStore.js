import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  devTools: true, // to make the extension work
  reducer: {
    auth: authSlice.reducer,
    api: apiSlice.reducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // i still don't know
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const authActions = authSlice.actions;
// export const apiActions = apiSlice.endpoints;
export default store;
