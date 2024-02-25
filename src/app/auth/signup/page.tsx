"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as authSlice from "@/GlobalRedux/Features/auth/authSlice";
import * as userSlice from "@/GlobalRedux/Features/user/userSlice";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";
import { validateEmail } from "@/helpers/helperFunctions";
import Link from "next/link";
import { useDebounce } from "@/hooks/debounce";

const initialState = {
  email: "@gmail.com",
  password: "123456",
  nickname: "",
};

export default function Sugnup() {
  const dispatch = useAppDispatch();
  const { isLoading, isAvialableNickName, error } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const [{ nickname, password, email }, setLoginValues] =
    useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const debouncedNickname = useDebounce(nickname, 500);

  const handleOnChnage = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = useCallback(async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Email must be at least 6 characters");
      return;
    }

    const newUser = {
      email,
      password,
      nickname,
    };

    const response = await dispatch(authSlice.signup(newUser));

    if (response.payload) {
      router.push("/company");
      dispatch(userSlice.getUserInfo());
    }
  }, [email, password, nickname, dispatch, router]);

  useEffect(() => {
    if (debouncedNickname.trim()) {
      dispatch(authSlice.checkNickname(debouncedNickname));
    }
  }, [dispatch, debouncedNickname]);

  return (
    <div className="flex flex-col gap-8 mx-auto mt-10 p-8 w-[400px] border border-[#B4B4B8] rounded-lg">
      <h2 className="text-4xl text-center text-[#74E291]">Signup</h2>

      <input
        className="p-4 border border-[#B4B4B8] w-[100%]"
        type="text"
        placeholder="Nickname"
        name="nickname"
        value={nickname}
        onChange={handleOnChnage}
      />

      <input
        className="p-4 border border-[#B4B4B8]"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleOnChnage}
      />

      <div className="flex flex-col gap-1">
        <input
          className="p-4 border border-[#B4B4B8]"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleOnChnage}
        />
        <label className="flex items-center gap-1 text-[#45474B]">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={({ target }) => setShowPassword(target.checked)}
          />
          Show Password
        </label>
      </div>

      <div>
        {isLoading ? (
          <div className="mx-auto max-w-fit">
            <Loader />
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 m-0">{error}</p>}
            <button
              className="py-[8px] border border-[#74E291] rounded-lg text-xl text-[#74E291] hover:scale-105 transform transition-transform duration-300 w-[100%]"
              onClick={handleSignup}
              disabled={!isAvialableNickName}
            >
              SIGNUP
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col">
        <Link href="/auth/login">
          Have an account?{" "}
          <strong className="text-[#008170] font-bold cursor-pointer">
            Login
          </strong>
        </Link>
        <Link href="/auth/resetPassword">
          Forgot{" "}
          <strong className="text-[#008170] font-bold cursor-pointer">
            Password?
          </strong>
        </Link>
      </div>
    </div>
  );
}
