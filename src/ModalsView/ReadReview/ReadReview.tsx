import { useModalContext } from "@/context/ModalContext";
import { convertDateToMonthAndYear } from "@/helpers/helperFunctions";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";

export const ReadReview = () => {
  const { modal, handleCloseModal } = useModalContext();
  const readReviewRef = useRef(null);

  useClickOutside(readReviewRef, () => handleCloseModal());

  return (
    <div
      ref={readReviewRef}
      className="flex flex-col gap-[10px] w-[500px] p-[20px] rounded-xl text-[#FFF]"
      style={{ backgroundColor: "#545b5c" }}
    >
      <p className="overflow-hidden">{modal.review?.review}</p>
      <span className="border-b-2" />

      <p className="opacity-[0.4]">
        {convertDateToMonthAndYear(modal.review?.createdAt!)}
      </p>
    </div>
  );
};
