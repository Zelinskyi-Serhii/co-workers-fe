"use client";

import { useGetEmployeeByIdQuery } from "@/GlobalRedux/Features/employee/employeeApi";
import { useGetAllReviewsQuery } from "@/GlobalRedux/Features/review/reviewApi";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { Loader } from "@/components/Loader";
import Image from "next/image";

export default function EmployeeInfo(props: any) {
  const { id } = props.params;
  const { setModal } = useModalContext();

  const { data: employee } = useGetEmployeeByIdQuery({
    employeeId: id,
  });

  const {
    data: reviews,
    isSuccess,
    isLoading,
  } = useGetAllReviewsQuery({
    employeeId: id,
  });

  const fullname = ` ${employee?.firstname} ${employee?.lastname}`;

  const handleAddNewReview = () => {
    setModal({
      employeeReviewAdd: employee,
      isOpen: true,
      modalType: ModalType.REVIEW,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mb-[30px] relative">
            <h1 className="flex justify-center gap-[15px] text-[#FFF] text-center font-semibold text-[30px]">
              <span className="opacity-60">All Review about</span>
              {employee && (
                <>
                  {fullname}
                  <span className="bg-[#FFF] rounded-xl">
                    <Image
                      alt={employee.firstname}
                      src={employee.avatarUrl}
                      width={50}
                      height={70}
                      className=""
                    />
                  </span>
                </>
              )}
              <div className="absolute top-0 right-0">
                <Button onClick={handleAddNewReview}>+ Add new Review</Button>
              </div>
            </h1>
          </div>

          <div className="flex flex-wrap gap-[15px]">
            {reviews?.map((review) => (
              <ReviewCard reviewData={review} key={review.id} />
            ))}
          </div>
        </>
      )}

      {isSuccess && !reviews.length && (
        <h3 className="mt-[60px] text-center mb-4 text-3xl text-[#FFF]">
          This employee do not have any reviews yet.
        </h3>
      )}
    </>
  );
}
