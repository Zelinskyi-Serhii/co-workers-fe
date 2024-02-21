"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/GlobalRedux/Features/auth/authSlice";
import userReducer from "@/GlobalRedux/Features/user/userSlice";
import companyReducer from "@/GlobalRedux/Features/company/companySlice";
import employeeReducer from "@/GlobalRedux/Features/employee/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    employee: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
