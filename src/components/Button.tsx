import { FC, ReactNode } from "react";
import { Loader } from "./Loader";

type Props = {
  children: ReactNode;
  color?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

export const Button: FC<Props> = ({
  color = "#1976d2",
  children,
  isDisabled,
  onClick,
  isLoading,
}) => (
  <button
    className={`flex justify-center bg-[${color}] w-[200px] p-3 rounded-xl hover-scale text-white text-base font-semibold`}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {isLoading ? <Loader /> : children}
  </button>
);
