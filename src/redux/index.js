import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersSlice } from "./users";

export const store = configureStore({
  reducer: {
    [usersSlice.reducerPath]: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersSlice.middleware),
});
