import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface IRequestData {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  header?: AxiosRequestConfig["headers"];
  prevent?: boolean;
  overrideBaseUrl?: string;
}

export const axiosBaseQuery = (): BaseQueryFn<IRequestData> => {
  return async ({ url, method, data, params, header }): Promise<any> => {
    let headers: AxiosRequestConfig["headers"] = {};

    headers["Content-Type"] = "application/json";

    if (header) {
      headers = { ...headers, ...header };
    }

    try {
      const result = await axiosInstance({
        url: process.env.NEXT_PUBLIC_BASE_URL + url,
        method: method || "get",
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: { status: err.response?.status, results: err.response?.data },
      };
    }
  };
};
