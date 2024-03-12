import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

interface IUser {
  nickname: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ISignup extends ILogin {
  nickname: string;
}

export interface IAuthResponse {
  success: boolean;
  data: {
    accessToken?: string;
  };
  message: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUser, void>({
      query: () => {
        return { url: "/auth/userInfo" };
      },
    }),
    login: builder.mutation<IUser, ILogin>({
      query: (data: ILogin) => {
        return { url: "/auth/login", method: "POST", data };
      },
      transformResponse: (response: IUser) => {
        localStorage.setItem("accessToken", response.accessToken);
        return response;
      },
    }),
    signup: builder.mutation<IUser, ISignup>({
      query: (data: ISignup) => {
        return { url: "/auth/signup", method: "POST", data };
      },
      transformResponse: (response: IUser) => {
        localStorage.setItem("accessToken", response.accessToken);
        return response;
      },
    }),
  }),
});

export const {
  useLazyGetUserInfoQuery,
  useGetUserInfoQuery,
  useLoginMutation,
  useSignupMutation,
} = userApi;
