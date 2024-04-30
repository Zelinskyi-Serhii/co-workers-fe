import { useState, useEffect, useRef, FormEvent } from "react";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";
import {
  useResetPasswordMutation,
  useSendResetPasswordCodeMutation,
  useVerifyResetPasswordCodeMutation,
} from "@/GlobalRedux/Features/user/userApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Loader } from "@/components/Loader";
import { ShowPasswordIcon } from "@/svgComponents/ShowPassword";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [varificationCode, setVarificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const resetPasswordRef = useRef(null);

  useClickOutside(resetPasswordRef, handleCloseModal);

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    sendEmail(email);
    setResendTimer(Date.now() + 60000);
    setRemainingTime(60);
  };

  const handleResendCode = () => {
    sendEmail(email);
    setResendTimer(Date.now() + 60000);
    setRemainingTime(60);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
    if (resendTimer !== null) {
      const interval = setInterval(() => {
        const timeDifference = Math.floor((resendTimer - Date.now()) / 1000);
        if (timeDifference <= 0) {
          setResendTimer(null);
          setRemainingTime(null);
          clearInterval(interval);
        } else {
          setRemainingTime(timeDifference);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (isErrorSendEmail) {
      toast.error("User does not exist");
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
    <div ref={resetPasswordRef} className="bg-[#FFF] p-4 rounded-md min-w-360">
      <h1 className="text-center mb-4 font-semibold text-[28px]">
        Reset Password
      </h1>

      {step === ResetPasswordStep.EMAIL && (
        <form onSubmit={handleSendEmail}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 outline-none border-2 py-2 px-[8px]"
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
              onComplete={(value) => {
                verifyCode({ email, code: Number(value) });
                setVarificationCode(value);
              }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              focus
            />
          </div>
          <p className="mb-[20px] text-center text-grey-200 opacity-10">
            Verification code sent to email
          </p>

          {isLoadingVerify && (
            <div className="flex justify-center mb-2">
              <Loader />
            </div>
          )}

          <Button
            className="mx-auto"
            buttonType={ButtonColorByType.DISMISS}
            onClick={handleResendCode}
            isDisabled={!!resendTimer}
          >
            Resend
            {remainingTime !== null && <span> ({remainingTime}s)</span>}
          </Button>
        </>
      )}

      {step === ResetPasswordStep.PASSWORD && (
        <form onSubmit={handleChangePassword}>
          <div className="relative w-full">
            <label className="flex flex-col">
              New Password
              <input
                className="w-[300px] mb-4 outline-none border-2 py-2 px-[8px]"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter"
                value={newPassword}
                onChange={({ target }) => setNewPassword(target.value)}
              />
            </label>

            <div
              className="absolute top-37 right-[10px] cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <ShowPasswordIcon isVisible={isPasswordVisible} />
            </div>
          </div>

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
