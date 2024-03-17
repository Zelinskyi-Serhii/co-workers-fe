"use client";

import { configureStore } from "@reduxjs/toolkit";
import { employeeApi } from "./Features/employee/employeeApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./Features/user/userApi";
import { companyApi } from "./Features/company/companyApi";

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeeApi.middleware,
      userApi.middleware,
      companyApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
