"use client";

import PinInput from "react-pin-input";
import {
  useResetPasswordMutation,
  useSendResetPasswordCodeMutation,
  useVerifyResetPasswordCodeMutation,
} from "@/GlobalRedux/Features/user/userApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";

enum ResetPasswordStep {
  EMAIL = "email",
  CODE = "code",
  PASSWORD = "password",
}

export const ResetPasswordModal = () => {
  const [
    sendEmail,
    {
      isError: isErrorSendEmail,
      isSuccess: isSuccessSendEmail,
      isLoading: isLoadingSendEmail,
    },
  ] = useSendResetPasswordCodeMutation();
  const [
    verifyCode,
    {
      isError: isErrorVerify,
      isSuccess: isSuccessVerify,
      isLoading: isLoadingVerify,
    },
  ] = useVerifyResetPasswordCodeMutation();
  const [
    resetPassword,
    {
      isError: isErrorReset,
      isSuccess: isSuccessReset,
      isLoading: isLoadingReset,
    },
  ] = useResetPasswordMutation();
  const { setModal, handleCloseModal } = useModalContext();
  const [step, setStep] = useState(ResetPasswordStep.EMAIL);
  const [email, setEmail] = useState("");
  const [varificationCode, setVarificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const resetpasswordRef = useRef(null);

  useClickOutside(resetpasswordRef, handleCloseModal);

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();

    sendEmail(email);
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();

    resetPassword({
      email,
      code: Number(varificationCode),
      password: newPassword,
    });
  };

  useEffect(() => {
    if (isErrorSendEmail) {
      toast.error("User doest not exist");
    }

    if (isSuccessSendEmail) {
      setStep(ResetPasswordStep.CODE);
    }

    if (isErrorVerify) {
      toast.error("Wrong verify code");
    }

    if (isSuccessVerify) {
      setStep(ResetPasswordStep.PASSWORD);
    }

    if (isErrorReset) {
      toast.error("Unable to reset password, please try again");
      setModal({ modalType: ModalType.AUTH, isOpen: true });
    }

    if (isSuccessReset) {
      toast.success("Password changed successfully");
      setModal({ modalType: ModalType.AUTH, isOpen: true });
    }
  }, [
    isErrorReset,
    isErrorSendEmail,
    isErrorVerify,
    isSuccessReset,
    isSuccessSendEmail,
    isSuccessVerify,
    setModal,
  ]);

  return (
    <div ref={resetpasswordRef} className="bg-[#FFF] p-4 rounded-md">
      <h1 className="text-center mb-4 font-semibold text-[28px]">
        Reset Password
      </h1>

      {step === ResetPasswordStep.EMAIL && (
        <form onSubmit={handleSendEmail}>
          <input
            type="email"
            placeholder="Email"
            className="w-[300px]  mb-4 outline-none border-2 py-2 px-[8px]"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Button
            className="mx-auto"
            type="submit"
            isLoading={isLoadingSendEmail}
            isDisabled={!email.trim().length}
          >
            Send
          </Button>
        </form>
      )}

      {step === ResetPasswordStep.CODE && (
        <>
          <div className="flex justify-center">
            <PinInput
              length={6}
              type="numeric"
              inputStyle={{ borderColor: "grey" }}
              inputFocusStyle={{ borderColor: "blue" }}
              onChange={(value) => setVarificationCode(value)}
              onComplete={(value) => {
                verifyCode({ email, code: Number(value) });
              }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              focus
            />
          </div>
          <p className="mb-[20px] text-center text-grey-200 opacity-10">
            Verification code sended to email
          </p>

          {isLoadingVerify && (
            <div className="flex justify-center mb-2">
              <Loader />
            </div>
          )}

          <Button
            className="mx-auto"
            buttonType={ButtonColorByType.DISMISS}
            onClick={() => sendEmail(email)}
            // isDisabled
          >
            Resend
          </Button>
        </>
      )}

      {step === ResetPasswordStep.PASSWORD && (
        <form onSubmit={handleChangePassword}>
          <label className="flex flex-col">
            New Password
            <input
              className="w-[300px] mb-4 outline-none border-2 py-2 px-[8px]"
              type="password"
              placeholder="Enter"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
            />
          </label>

          <Button
            className="mx-auto"
            type="submit"
            isDisabled={newPassword.length < 6}
            isLoading={isLoadingReset}
          >
            Change Password
          </Button>
        </form>
      )}
    </div>
  );
};
