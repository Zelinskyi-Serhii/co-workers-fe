import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error?.response?.status)) {
      localStorage.removeItem("accessToken");
    }

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
    const authToken = localStorage.getItem("accessToken");
    let headers: AxiosRequestConfig["headers"] = {};

    if (authToken) {
      headers.authorization = `Bearer ${JSON.parse(authToken)}`;
    }

    headers["Content-Type"] = "application/json";

    if (header) {
      headers = { ...headers, ...header };
    }

    try {
      const result = await axios({
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
