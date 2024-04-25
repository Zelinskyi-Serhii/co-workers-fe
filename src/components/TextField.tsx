import { forwardRef } from "react";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  title?: string;
  value?: string;
  onChange?: (evt: { target: any }) => void;
  helpText?: string;
  isError?: boolean;
  ref?: React.ForwardedRef<HTMLInputElement>;
  data?: any;
  className?: string;
}

export const TextField = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { helpText, title, className, ...restProps } = props;

  return (
    <label className={`relative text-start w-full ${className}`}>
      <span className="text-[14px]">{title}</span>
      <input
        type="text"
        ref={ref}
        {...restProps}
        className="w-full border-none p-[0.7rem]"
      />
      {helpText && (
        <p className="absolute left-[10px] text-red-400 text-[12px]">
          {helpText}
        </p>
      )}
    </label>
  );
});

TextField.displayName = "TextField";
