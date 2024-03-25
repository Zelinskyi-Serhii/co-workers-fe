import { IReview } from "@/GlobalRedux/Features/review/reviewApi";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { convertDateToString } from "@/helpers/helperFunctions";
import { FC } from "react";

type Props = {
  reviewData: IReview;
};

export const ReviewCard: FC<Props> = ({ reviewData }) => {
  const { setModal } = useModalContext();
  const { createdAt, review } = reviewData;
  const isLong = review.length > 160;

  return (
    <div className="flex flex-col justify-between w-[24%] bg-[#232323] p-[10px] rounded-xl">
      <p className="text-[#FFF] overflow-hidden">
        {isLong ? review.slice(0, 160) + "..." : review}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-[#FFF] opacity-50">
          {convertDateToString(createdAt)}
        </p>

        {isLong && (
          <button
            className="text-[#FFF] py-[2px] px-[8px] rounded-xl bg-[#6c7375] hover-scale"
            onClick={() => {
              setModal({
                isOpen: true,
                review: reviewData,
                modalType: ModalType.READ_REVIEW,
              });
            }}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
};
