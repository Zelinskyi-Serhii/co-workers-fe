"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/GlobalRedux/Features/auth/authSlice";
import userReducer from "@/GlobalRedux/Features/user/userSlice";
import companyReducer from "@/GlobalRedux/Features/company/companySlice";
import { employeeApi } from "./Features/employee/employeeApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./Features/user/userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
