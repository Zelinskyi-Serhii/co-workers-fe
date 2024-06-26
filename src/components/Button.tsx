import { FC, ReactNode } from "react";
import { Loader } from "./Loader";

export enum ButtonColorByType {
  ACTIVE = "active",
  DISABLED = "disabled",
  DELETE = "delete",
  DISMISS = "Dismiss",
}

const buttonColorMap: Record<ButtonColorByType, string> = {
  [ButtonColorByType.ACTIVE]: "bg-[#1976d2]",
  [ButtonColorByType.DISABLED]: "bg-[#999999]",
  [ButtonColorByType.DELETE]: "bg-[#da160b]",
  [ButtonColorByType.DISMISS]: "bg-[#c7950a]",
};

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  buttonType?: ButtonColorByType;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const Button: FC<Props> = ({
  children,
  isDisabled,
  onClick,
  isLoading,
  buttonType = ButtonColorByType.ACTIVE,
  className = "",
  type = "button",
}) => (
  <button
    className={`
    flex justify-center 
    ${isDisabled ? "isDisabledButton" : buttonColorMap[buttonType]} 
    text-nowrap w-fit min-w-[120px] md:w-[200px] p-3 rounded-xl hover-scale text-white text-base font-semibold 
    ${className}
    `}
    onClick={onClick}
    disabled={isDisabled || isLoading}
    type={type}
  >
    {isLoading ? <Loader /> : children}
  </button>
);
