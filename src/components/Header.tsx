"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "@/svgComponents/ArrowDown";
import { SearchIcon } from "@/svgComponents/SearchIcon";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSession } from "@/context/SessionContext";
import { Loader } from "./Loader";
import { useDebounce } from "@/hooks/useDebounce";
import { useLazyGetEmployeeBySearchQuery } from "@/GlobalRedux/Features/employee/employeeApi";
import { getTotalYearsFromBirthDate } from "@/helpers/helperFunctions";
import { useChangeUserAvatarMutation } from "@/GlobalRedux/Features/user/userApi";
import { toast } from "react-toastify";

export const Header = () => {
  const { user, logout, isLoading } = useSession();
  const { setModal } = useModalContext();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenEmployees, setIsOpenEmployees] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpenMenu(false));

  const [searchEmployee, { data: searchedEmployees, isFetching }] =
    useLazyGetEmployeeBySearchQuery();
  const [
    changeAvatar,
    { isSuccess: isSuccessChangeAvatar, isError: isErrorChangeAvatar },
  ] = useChangeUserAvatarMutation();

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    const formData = new FormData();
    formData.append("avatarUrl", file);

    changeAvatar(formData);

    reader.onloadend = () => {
      setUserAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleToggleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleAuth = useCallback(() => {
    setModal({
      modalType: ModalType.AUTH,
      isOpen: true,
    });
  }, [setModal]);

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      searchEmployee(debouncedSearch);
      setIsOpenEmployees(true);
    }
  }, [debouncedSearch, searchEmployee]);

  useEffect(() => {
    if (isSuccessChangeAvatar) {
      toast.success("Avatar changed successfully");
    }

    if (isErrorChangeAvatar) {
      setUserAvatar(user?.avatarUrl || "");
    }
  }, [isErrorChangeAvatar, isSuccessChangeAvatar, user?.avatarUrl]);

  return (
    <header className="py-4 px-4 sm:px-10 bg-[#0f1121] min-h-[70px] border-b-2 border-b-[#3b3e4a]">
      <div className="flex flex-wrap items-center justify-between gap-5 relative">
        <Link href="/" className="md:block w-fit md:w-[300px]">
          <Image
            src="https://res.cloudinary.com/dzuxudptr/image/upload/v1708516652/h6rlzdqtgx9wdvm4nmm7.png"
            alt="Company Logo"
            width={60}
            height={36}
          />
        </Link>

        <div className="relative order-2 md:order-none w-[100%] md:w-fit">
          <input
            type="text"
            name="search"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search Employee"
            className="py-2 pl-2 pr-10 border border-[#B7BDBA] rounded-xl outline-none w-[100%] md:w-[400px]"
            onBlur={() => setSearch("")}
          />
          <div className="absolute top-[12px] right-[12px]">
            <SearchIcon />
          </div>

          {debouncedSearch.length > 2 && isOpenEmployees && (
            <div className="absolute top-[45px] bg-[#FFF] rounded-xl w-[100%] py-2 px-4 z-10">
              {isFetching && (
                <div className="flex justify-center">
                  <Loader />
                </div>
              )}

              {Boolean(searchedEmployees?.length) && (
                <div className="flex flex-col gap-[10px] max-h-[200px] overflow-y-auto">
                  {searchedEmployees?.map((employee) => (
                    <Link
                      key={employee.id}
                      className="flex items-center gap-[10px] [&:not(:last-child)]:border-b-[1px] border-[#999999] [&:not(:last-child)]:pb-2"
                      href={`/public/employee/${employee.id}`}
                    >
                      <Image
                        className="h-[30px] w-[30px]"
                        src={employee.avatarUrl}
                        alt={employee.firstname}
                        width={50}
                        height={20}
                      />
                      <span className="truncate max-w-[100px]">{`${employee.firstname} ${employee.lastname}`}</span>
                      <span className="text-[14px]">
                        <strong>
                          {getTotalYearsFromBirthDate(employee.birthday)}
                        </strong>{" "}
                        years
                      </span>
                      <button
                        className="bg-[#1976d2] ml-auto py-[2px] px-4 text-[#FFF] rounded-xl"
                        onClick={() => setIsOpenEmployees(false)}
                      >
                        <Link href={`/public/employee/${employee.id}`}>
                          reviews
                        </Link>
                      </button>
                    </Link>
                  ))}
                </div>
              )}

              {!isFetching && !searchedEmployees?.length && (
                <p className="text-[14px]">
                  No employees found matching the search criteria
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end max-sm:ml-auto md:w-[300px]">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {user && (
                <div className="flex items-center cursor-pointer gap-2 px-4 bg-grey-500">
                  <label className="relative">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleUploadImage}
                    />
                    <Image
                      src={userAvatar || user.avatarUrl}
                      height={40}
                      width={40}
                      alt="User Profile"
                      className="rounded-full w-[40px] h-[40px]"
                    />
                    <div className="absolute flex justify-center items-center rounded-[50%] top-0 h-[40px] w-full bg-[#888] bg-opacity-50 hover-opacity cursor-pointer">
                      <span className="text-white text-4xl font-bold">+</span>
                    </div>
                  </label>

                  <div
                    className="relative flex items-center gap-1"
                    onClick={handleToggleMenu}
                    ref={dropdownRef}
                  >
                    <span
                      className="text-[#FFFFFF] truncate max-w-[150px]"
                      title={user.nickname}
                    >
                      {user.nickname}
                    </span>

                    <ArrowDown isOpen={isOpenMenu} />

                    {isOpenMenu && (
                      <ul className="flex flex-col w-[190px] absolute z-20 bg-[#EDEDED] top-10 p-4 right-0 rounded-xl [&>a:hover]:text-[#ec4646] [&>a]:p-2 [&>a]:transition-all">
                        <Link href="/company">My Companies</Link>
                        <Link href="/company/create">Create Company</Link>
                        <Link href="/company/settings">Company Settings</Link>
                        <Link
                          href=""
                          className="text-[#ec4646]"
                          onClick={logout}
                        >
                          Logout
                        </Link>
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {!user && (
                <button
                  onClick={handleAuth}
                  className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                >
                  Login/Signup
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
