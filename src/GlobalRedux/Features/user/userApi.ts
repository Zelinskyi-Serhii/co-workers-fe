import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

interface IUser {
  nickname: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  refreshToken: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ISignup extends ILogin {
  nickname: string;
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
        localStorage.setItem("refreshToken", response.refreshToken);
        return response;
      },
    }),
    signup: builder.mutation<IUser, ISignup>({
      query: (data: ISignup) => {
        return { url: "/auth/signup", method: "POST", data };
      },
      transformResponse: (response: IUser) => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        return response;
      },
    }),
    sendResetPasswordCode: builder.mutation({
      query: (email: string) => {
        return {
          url: "/auth/sendResetPasswordCode",
          method: "POST",
          data: { email },
        };
      },
    }),
    verifyResetPasswordCode: builder.mutation<
      { data: { message: string } },
      { email: string; code: number }
    >({
      query: ({ email, code }) => {
        return {
          url: "/auth/verifyResetCode",
          method: "POST",
          data: { email, code },
        };
      },
    }),
    resetPassword: builder.mutation<
      { data: { message: string } },
      { email: string; code: number; password: string }
    >({
      query: (data) => {
        return { url: "/auth/resetPassword", method: "POST", data };
      },
    }),
    changeUserAvatar: builder.mutation<IUser, FormData>({
      query: (newAvatar) => {
        return {
          url: "/auth/changeAvatar",
          method: "PUT",
          data: newAvatar,
          header: { "Content-Type": "multipart/form-data" },
        };
      },
    }),
  }),
});

export const {
  useLazyGetUserInfoQuery,
  useGetUserInfoQuery,
  useLoginMutation,
  useSignupMutation,
  useSendResetPasswordCodeMutation,
  useVerifyResetPasswordCodeMutation,
  useResetPasswordMutation,
  useChangeUserAvatarMutation,
} = userApi;
