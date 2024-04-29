"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { TextField } from "@/components/TextField";
import { signInValidationSchema, signUpValidationSchema } from "./validation";

type FormValues = {
  nickname: string;
  email: string;
  password: string;
};

export const AuthModal = () => {
  const { setModal, handleCloseModal } = useModalContext();
  const authModalRef = useRef(null);
  const { loadUserData } = useSession();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginUser, { isSuccess, isLoading, isError, reset }] =
    useLoginMutation();
  const [
    signupUser,
    {
      isSuccess: isSuccessSignup,
      isLoading: isLoadingSignUp,
      isError: isErrorSignup,
      reset: resetSignup,
    },
  ] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
    clearErrors: clearErrorsSignUp,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });

  useClickOutside(authModalRef, () =>
    setModal({ isOpen: false, modalType: ModalType.AUTH })
  );

  const handleLogin = (values: Omit<FormValues, "nickname">) => {
    loginUser({ ...values });
  };

  const handleSignup = (values: FormValues) => {
    signupUser({ ...values });
  };

  const handleToggleForm = () => {
    setIsRightPanelActive((prev) => !prev);
    clearErrors();
    clearErrorsSignUp();
    reset();
    resetSignup();
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
      className={`auth-modal ${isRightPanelActive ? "right-panel-active" : ""}`}
      ref={authModalRef}
    >
      <div className="auth-modal__form auth-modal--signup">
        <form
          className="form px-[8px] md:px-[20px]"
          onSubmit={handleSubmitSignUp(handleSignup)}
        >
          <h2 className="form__title">Sign Up</h2>

          <TextField
            title={"Nickname"}
            {...registerSignUp("nickname")}
            helpText={errorsSignUp.nickname?.message}
          />

          <TextField
            title="Email"
            {...registerSignUp("email")}
            helpText={errorsSignUp.email?.message}
          />

          <TextField
            title="Password"
            {...registerSignUp("password")}
            helpText={errorsSignUp.password?.message}
            type="password"
          />

          <Button
            isLoading={isLoadingSignUp}
            type="submit"
            className="auth-form__submit-button"
          >
            Sign Up
          </Button>
        </form>
      </div>

      <div className="auth-modal__form auth-modal--signin">
        <form
          className="form px-[8px] md:px-[20px]"
          id="form2"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h2 className="form__title">Sign In</h2>

          <TextField
            title="Email"
            {...register("email")}
            helpText={errors.email?.message}
          />

          <TextField
            title="Password"
            {...register("password")}
            helpText={errors.password?.message}
            type="password"
          />

          <button
            className=" text-[#333] text-[0.9rem]"
            onClick={handlForgotPassword}
            style={{ marginBottom: 48 }}
          >
            Forgot your password?
          </button>

          <Button isLoading={isLoading} type="submit">
            Sign In
          </Button>
        </form>
      </div>

      <div className="auth-modal__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            <button className="btn" id="signIn" onClick={handleToggleForm}>
              Sign In
            </button>
          </div>
          <div className="overlay__panel overlay--right">
            <button className="btn" id="signUp" onClick={handleToggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
