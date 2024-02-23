"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as userActions from "@/GlobalRedux/Features/user/userSlice";
import * as authActions from "@/GlobalRedux/Features/auth/authSlice";
import { ArrowDown } from "@/svgComponents/ArrowDown";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { nickname, avatarUrl, isLoading } = useAppSelector(
    (state) => state.user
  );
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  useEffect(() => {
    (async() => {
     const response = await dispatch(userActions.getUserInfo());

      if (!response.payload) {
        localStorage.clear();
        router.push("/auth");
      }
    })()
  }, [dispatch, router]);

  return (
    <header className="shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] h-[70px]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <Link href="">
          <Image
            src="https://res.cloudinary.com/dzuxudptr/image/upload/v1708516652/h6rlzdqtgx9wdvm4nmm7.png"
            alt="Company Logo"
            width={60}
            height={36}
          />
        </Link>

        {avatarUrl && (
          <ul
            id="collapseMenu"
            className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
          >
            <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
              <Link
                href="/company"
                className="lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]"
              >
                Company
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                href=""
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Team
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                href=""
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Feature
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                href=""
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Account
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                href=""
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                About
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
              <Link
                href=""
                className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Contact
              </Link>
            </li>
          </ul>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex max-sm:ml-auto">
            {avatarUrl ? (
              <div
                className="flex items-center cursor-pointer gap-2 px-4 relative"
                onClick={handleToggleMenu}
              >
                <span>{nickname}</span>
                <Image
                  src={avatarUrl}
                  height={40}
                  width={40}
                  alt="User Profile"
                  className="rounded-full"
                />
                <ArrowDown />

                {isOpenMenu && (
                  <ul className="flex flex-col absolute bg-[#EDEDED] top-10 p-4 left-0 right-0 rounded-xl [&>a:hover]:text-[#ec4646] [&>a]:p-2 [&>a]:transition-all">
                    <Link href="/company">My Companies</Link>
                    <Link href="/settings">Settings</Link>
                    <Link
                      href=""
                      className="text-[#ec4646]"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                  <Link href="/auth">Login/Signup</Link>
                </button>
                <button id="toggle" className="lg:hidden ml-7">
                  <svg
                    className="w-7 h-7"
                    fill="#000"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
