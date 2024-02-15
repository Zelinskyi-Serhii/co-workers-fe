import axios from "axios";

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

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if ([401, 403].includes(error?.response?.status)) {
//       localStorage.removeItem("accessToken");
//       window.location.href = "/auth";
//     }

//     return Promise.reject(error);
//   }
// );

export const client = {
  async get<T>(endpoint: string) {
    const response = await axiosInstance.get<T>(endpoint);

    return response;
  },

  async post<T>(endpoint: string, data: unknown) {
    const response = await axiosInstance.post<T>(endpoint, data);

    return response;
  },

  async put<T>(endpoint: string, data: unknown) {
    const response = await axiosInstance.put<T>(endpoint, data);

    return response;
  },

  async delete<T>(endpoint: string) {
    const response = await axiosInstance.delete<T>(endpoint);

    return response;
  },
};
