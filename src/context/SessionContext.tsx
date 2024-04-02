"use client";

import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { createStrictContext, useStrictContext } from "./strictContext";
import { useLazyGetUserInfoQuery } from "@/GlobalRedux/Features/user/userApi";
import { usePathname, useRouter } from "next/navigation";

enum ProtectedRoutes {
  Company = "/company",
  CompanySettings = "/company/settings",
  CompanyCreate = "/company/create",
  Employee = "/employee",
  EmployeeCreate = "/employee/create",
  Settings = "/settings",
}

const protectedRoutes: string[] = Object.values(ProtectedRoutes);

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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [triggerGetProfile, { isSuccess, isError }] = useLazyGetUserInfoQuery();
  const router = useRouter();
  const pathname = usePathname();

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    router.push("/");
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

  useEffect(() => {
    if (!pathname.includes("public") && !user && (isSuccess || isError)) {
      router.push("/");
    }
  }, [pathname, router, user, isSuccess, isError]);

  return (
    <SessionContext.Provider value={{ user, loadUserData, logOut, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useStrictContext(SessionContext);
};
