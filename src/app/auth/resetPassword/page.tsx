"use client";

import { useAppSelector } from "@/GlobalRedux/hooks";
import { ChangeEvent, useState } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";

export default function Login() {
  const { isLoading: loading } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    console.log("Reset password");
  };

  return (
    <div className="flex flex-col gap-8 mx-auto mt-10 p-8 w-[400px] border border-[#B4B4B8] rounded-lg">
      <h2 className="text-4xl text-center text-[#74E291]">Reset Password</h2>

      <input
        className="p-4 border border-[#B4B4B8]"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />

      <div>
        {loading ? (
          <div className="mx-auto max-w-fit">
            <Loader />
          </div>
        ) : (
          <button
            className="py-[8px] border border-[#74E291] rounded-lg text-xl text-[#74E291] hover:scale-105 transform transition-transform duration-300 w-[100%]"
            onClick={handleResetPassword}
          >
            RESET PASSWORD
          </button>
        )}
      </div>

      <div className="flex flex-col">
        <Link href="/auth/login">
          Have an account?{" "}
          <strong className="text-[#008170] font-bold cursor-pointer">
            Login
          </strong>
        </Link>
        <Link href="/auth/signup">
          Do not have an account?{" "}
          <strong className="text-[#008170] font-bold cursor-pointer">
            Register
          </strong>
        </Link>
      </div>
    </div>
  );
}
