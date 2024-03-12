"use client";

import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { createStrictContext, useStrictContext } from "./strictContext";
import { useLazyGetUserInfoQuery } from "@/GlobalRedux/Features/user/userApi";

interface IUser {
  nickname: string;
  email: string;
  avatarUrl: string;
}

interface ISessionContext {
  user: IUser | null;
  isLoading: boolean;
  loadUserData: () => void;
  logOut: () => void;
}

const SessionContext = createStrictContext<ISessionContext | null>();

export const SessionContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [triggerGetProfile, { data }] = useLazyGetUserInfoQuery();

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    window.location.pathname = "/";
  };

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

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <SessionContext.Provider value={{ user, loadUserData, logOut, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useStrictContext(SessionContext);
};
