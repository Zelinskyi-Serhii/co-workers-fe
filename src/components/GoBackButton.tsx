import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  className?: string;
  href?: string;
};

export const GoBackButton: FC<Props> = ({ className, href }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className={`bg-[#999] text-[16px] px-[4px] rounded-lg hover-scale text-[#FFF] ${className}`}
    >
      ← Go Back
    </button>
  );
};
