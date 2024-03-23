"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ArrowDown } from "@/svgComponents/ArrowDown";
import { Search } from "@/svgComponents/Search";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSession } from "@/context/SessionContext";
import { Loader } from "./Loader";

export const Header = () => {
  const { user, logOut, isLoading } = useSession();
  const { setModal } = useModalContext();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpenMenu(false));

  const handleToggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleAuth = useCallback(() => {
    setModal({
      modalType: ModalType.AUTH,
      isOpen: true,
    });
  }, [setModal]);

  return (
    <header className="py-4 px-4 sm:px-10 bg-[#0f1121] h-[70px] border-b-2 border-b-[#3b3e4a]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <Link href="/" className="hidden md:block ">
          <Image
            src="https://res.cloudinary.com/dzuxudptr/image/upload/v1708516652/h6rlzdqtgx9wdvm4nmm7.png"
            alt="Company Logo"
            width={60}
            height={36}
          />
        </Link>

        <div className="relative">
          <input
            type="text"
            name="search"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search Employee"
            className="py-2 pl-2 pr-10 border border-[#B7BDBA] rounded-xl outline-none  w-[400px] "
          />
          <div className="absolute top-[12px] right-[12px] cursor-pointer">
            <Search />
          </div>
        </div>

        <div className="flex items-center  max-sm:ml-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {user && (
                <div className="flex items-center cursor-pointer gap-2 px-4 bg-grey-500">
                  <Image
                    src={user.avatarUrl}
                    height={40}
                    width={40}
                    alt="User Profile"
                    className="rounded-full max-w-[40px] max-h-[40px]"
                  />

                  <div
                    className="relative flex items-center gap-3"
                    onClick={handleToggleMenu}
                    ref={dropdownRef}
                  >
                    <span className="text-[#FFFFFF]">{user.nickname}</span>
                    <ArrowDown />
                    {isOpenMenu && (
                      <ul className="flex flex-col w-[190px] absolute z-20 bg-[#EDEDED] top-10 p-4 right-0 rounded-xl [&>a:hover]:text-[#ec4646] [&>a]:p-2 [&>a]:transition-all">
                        <Link href="/company">My Companies</Link>
                        <Link href="/company/create">Create Company</Link>
                        <Link href="/company/settings">Company Settings</Link>
                        <Link
                          href=""
                          className="text-[#ec4646]"
                          onClick={logOut}
                        >
                          Logout
                        </Link>
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {!user && (
                <>
                  <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                    <button onClick={handleAuth}>Login/Signup</button>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};
