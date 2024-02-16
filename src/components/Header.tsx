"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import * as userActions from "@/GlobalRedux/Features/userSlice";
import { ArrowDown } from "@/svgComponents/ArrowDown";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { nickname, avatarUrl, loading } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(userActions.getUserInfo());
  }, [dispatch]);

  return (
    <header className="shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] h-[70px]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <Link href="">
          <Image
            src="https://readymadeui.com/readymadeui.svg"
            alt="Company Logo"
            width={136}
            height={36}
          />
        </Link>

        <div className="flex lg:order-1 max-sm:ml-auto">
          {avatarUrl ? (
            <div className="flex items-center cursor-pointer gap-2 bg-[#EDEDED] px-4 rounded-xl">
              <Image
                src={avatarUrl}
                height={40}
                width={40}
                alt="User Profile"
                className="rounded-full"
              />
              <ArrowDown />
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
      </div>
    </header>
  );
};
