"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./AuthModal.scss";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button } from "@/components/Button";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/GlobalRedux/Features/user/userApi";
import { useSession } from "@/context/SessionContext";
import { toast } from "react-toastify";

const initialValue = {
  nickname: "",
  email: "",
  password: "",
};

export const AuthModal = () => {
  const { setModal } = useModalContext();
  const authModalRef = useRef(null);
  const { loadUserData } = useSession();
  const [{ email, nickname, password }, setAuthValue] = useState(initialValue);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginUser, { isSuccess, isLoading, isError }] = useLoginMutation();
  const [
    signupUser,
    {
      isSuccess: isSuccessSignup,
      isLoading: isLoadingSignUp,
      isError: isErrorSignup,
    },
  ] = useSignupMutation();

  useClickOutside(authModalRef, () =>
    setModal({ isOpen: false, modalType: ModalType.AUTH })
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    loginUser({ email, password });
  };

  const handleSignup = () => {
    signupUser({ email, nickname, password });
  };

  useEffect(() => {
    if (isSuccess || isSuccessSignup) {
      loadUserData();
      setModal({ isOpen: false });
    }

    if (isError || isErrorSignup) {
      toast.error("Unable to autorize");
    }
  }, [
    isSuccess,
    loadUserData,
    isError,
    setModal,
    isSuccessSignup,
    isErrorSignup,
  ]);

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      ref={authModalRef}
    >
      <div className="container__form container--signup">
        <form action="#" className="form" id="form1">
          <h2 className="form__title">Sign Up</h2>
          <input
            type="text"
            placeholder="Nickname"
            className="input"
            name="nickname"
            value={nickname}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <Button onClick={handleSignup} isLoading={isLoadingSignUp}>
            Sign Up
          </Button>
        </form>
      </div>

      <div className="container__form container--signin">
        <form action="#" className="form" id="form2">
          <h2 className="form__title">Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            className="input"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <a href="#" className="link">
            Forgot your password?
          </a>
          <Button isLoading={isLoading} onClick={handleLogin}>
            Sign In
          </Button>
        </form>
      </div>

      <div className="container__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            <button
              className="btn"
              id="signIn"
              onClick={() => setIsRightPanelActive(false)}
            >
              Sign In
            </button>
          </div>
          <div className="overlay__panel overlay--right">
            <button
              className="btn"
              id="signUp"
              onClick={() => setIsRightPanelActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
