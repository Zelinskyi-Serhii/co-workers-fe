"use client";

import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { createStrictContext, useStrictContext } from "./strictContext";
import { useLazyGetUserInfoQuery } from "@/GlobalRedux/Features/user/userApi";
import { usePathname, useRouter } from "next/navigation";
import { axiosInstance } from "@/api/axios";
import { AxiosResponse } from "axios";

interface IUser {
  nickname: string;
  email: string;
  avatarUrl: string;
}

interface ISessionContext {
  user: IUser | null;
  isLoading: boolean;
  loadUserData: () => void;
  logout: () => void;
}

const SessionContext = createStrictContext<ISessionContext | null>();

export const SessionContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [triggerGetProfile, { isSuccess, isError }] = useLazyGetUserInfoQuery();
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(
    (withRegirectToHome?: boolean) => {
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      if (withRegirectToHome) {
        router.push("/");
      }
    },
    [router]
  );

  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await triggerGetProfile();

      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [triggerGetProfile]);

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      const originalConfig = error.config;

      if (originalConfig.url.includes("auth/refresh")) {
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const data: AxiosResponse<{
          refreshToken: string;
          accessToken: string;
        }> = await axiosInstance.post("/auth/refresh", { refreshToken });

        if (!data.data.accessToken || !data.data.refreshToken) {
          logout();
          return;
        }

        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        return axiosInstance(originalConfig);
      } catch (err) {
        logout();

        return Promise.reject(err);
      }
    }
  );

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    if (!pathname.includes("public") && !user && (isSuccess || isError)) {
      logout(true);
    }
  }, [pathname, user, isSuccess, isError, logout]);

  return (
    <SessionContext.Provider value={{ user, loadUserData, logout, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useStrictContext(SessionContext);
};
