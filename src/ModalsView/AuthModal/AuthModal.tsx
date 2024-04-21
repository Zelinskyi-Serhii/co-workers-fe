"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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
import { isValidFormData } from "@/helpers/helperFunctions";

const initialValue = {
  nickname: "",
  email: "",
  password: "",
};

export const AuthModal = () => {
  const { setModal, handleCloseModal } = useModalContext();
  const authModalRef = useRef(null);
  const { loadUserData } = useSession();
  const [{ email, nickname, password }, setAuthValue] = useState(initialValue);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginUser, { isSuccess, isLoading, isError, error }] =
    useLoginMutation();
  const [
    signupUser,
    {
      isSuccess: isSuccessSignup,
      isLoading: isLoadingSignUp,
      isError: isErrorSignup,
    },
  ] = useSignupMutation();

  const isDisabledSignupButton =
    isValidFormData(email, nickname) || password.trim().length < 6;

  const isDisabledLoginButton =
    isValidFormData(email) || password.trim().length < 6;

  useClickOutside(authModalRef, () =>
    setModal({ isOpen: false, modalType: ModalType.AUTH })
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    loginUser({ email, password });
  };

  const handleSignup = (event: FormEvent) => {
    event.preventDefault();
    signupUser({ email, nickname, password });
  };

  const handlForgotPassword = () => {
    setModal({ isOpen: true, modalType: ModalType.RESET_PASSWORD });
  };

  useEffect(() => {
    if (isSuccess || isSuccessSignup) {
      loadUserData();
      handleCloseModal();
    }

    if (isErrorSignup) {
      toast.error("User with this email already exist");
    }

    if (isError) {
      toast.error("Wrong email or password");
    }
  }, [
    isSuccess,
    loadUserData,
    isError,
    handleCloseModal,
    isSuccessSignup,
    isErrorSignup,
  ]);

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      ref={authModalRef}
    >
      <div className="container__form container--signup">
        <form className="form" id="form1" onSubmit={handleSignup}>
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
            placeholder="Password. At least 6 characters"
            className="input"
            name="password"
            value={password}
            onChange={handleInputChange}
          />

          <Button
            isLoading={isLoadingSignUp}
            isDisabled={isDisabledSignupButton}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>

      <div className="container__form container--signin">
        <form className="form" id="form2" onSubmit={handleLogin}>
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

          <button className="link" onClick={handlForgotPassword}>
            Forgot your password?
          </button>

          <Button
            isLoading={isLoading}
            type="submit"
            isDisabled={isDisabledLoginButton}
          >
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
