"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/GlobalRedux/Features/authSlice";
import userReducer from "@/GlobalRedux/Features/userSlice";
import companyReducer from "@/GlobalRedux/Features/companySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
