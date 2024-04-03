import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-[#999] text-[16px] px-[4px] rounded-lg hover-scale text-[#FFF]"
    >
      ← Go Back
    </button>
  );
};
