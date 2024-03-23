import { FC, ReactNode } from "react";
import { Loader } from "./Loader";

export enum ButtonColorByType {
  ACTIVE = "active",
  DISABLED = "disabled",
  DELETE = "delete",
}

const buttonColorMap: Record<ButtonColorByType, string> = {
  [ButtonColorByType.ACTIVE]: "bg-[#1976d2]",
  [ButtonColorByType.DISABLED]: "bg-[#999999]",
  [ButtonColorByType.DELETE]: "bg-[#da160b]",
};

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  buttonType?: ButtonColorByType;
  className?: string;
};

export const Button: FC<Props> = ({
  children,
  isDisabled,
  onClick,
  isLoading,
  buttonType = ButtonColorByType.ACTIVE,
  className = "",
}) => (
  <button
    className={`
      flex justify-center 
      ${isDisabled ? "isDisabledButton" : buttonColorMap[buttonType]} 
      w-[200px] p-3 rounded-xl hover-scale text-white text-base font-semibold 
      ${className}
    `}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {isLoading ? <Loader /> : children}
  </button>
);
