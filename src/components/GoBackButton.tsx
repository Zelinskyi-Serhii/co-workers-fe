import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  className?: string;
};

export const GoBackButton: FC<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`bg-[#999] text-[16px] px-[4px] rounded-lg hover-scale text-[#FFF] ${className}`}
    >
      ← Go Back
    </button>
  );
};
