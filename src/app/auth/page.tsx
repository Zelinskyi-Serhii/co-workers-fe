"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import * as authActions from "@/GlobalRedux/Features/auth/authSlice";
import * as userActions from "@/GlobalRedux/Features/user/userSlice";
import { Loader } from "@/components/Loader";

const initialState = {
  email: "sepyh1@gmail.com",
  password: "123456",
  nickname: "",
};

enum Mode {
  LOGIN = "Login",
  SIGNUP = "Signup",
  RESET_PASSWORD = "Reset Password",
}

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [{ nickname, password, email }, setLoginValues] =
    useState(initialState);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mode, setMode] = useState(Mode.LOGIN);

  const handleOnChnage = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setIsError(true);
      return;
    }

    setIsError(false);
    const result = await dispatch(
      authActions.login({
        email,
        password,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(userActions.getUserInfo())
      router.push("/company");
    }
  }, [dispatch, email, password, router]);

  return (
    <div className="flex flex-col gap-8 mx-auto mt-10 p-8 w-[400px] border border-[#B4B4B8] rounded-lg">
      <h2 className="text-4xl text-center text-[#74E291]">{mode}</h2>

      {mode === Mode.SIGNUP && (
        <input
          className="p-4 border border-[#B4B4B8]"
          type="text"
          placeholder="Nickname"
          name="nuckname"
          value={nickname}
          onChange={handleOnChnage}
        />
      )}

      <input
        className="p-4 border border-[#B4B4B8]"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleOnChnage}
      />

      {mode !== Mode.RESET_PASSWORD && (
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
      )}

      <div>
        {isError && <p className="text-[red] my-0">All fields are required</p>}

        {loading ? (
          <div className="mx-auto max-w-fit">
            <Loader />
          </div>
        ) : (
          <button
            className="py-[8px] border border-[#74E291] rounded-lg text-xl text-[#74E291] hover:scale-105 transform transition-transform duration-300 w-[100%]"
            onClick={handleLogin}
          >
            {mode.toLocaleUpperCase()}
          </button>
        )}
      </div>

      <div>
        {mode !== Mode.RESET_PASSWORD && (
          <p>
            Forgot{" "}
            <strong
              className="text-[#008170] font-bold cursor-pointer"
              onClick={() => setMode(Mode.RESET_PASSWORD)}
            >
              Password?
            </strong>
          </p>
        )}
        {mode === Mode.LOGIN ? (
          <p>
            Do not have an account?{" "}
            <strong
              className="text-[#008170] font-bold cursor-pointer"
              onClick={() => setMode(Mode.SIGNUP)}
            >
              Register
            </strong>
          </p>
        ) : (
          <p>
            Have an account?{" "}
            <strong
              className="text-[#008170] font-bold cursor-pointer"
              onClick={() => setMode(Mode.LOGIN)}
            >
              Login
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}
