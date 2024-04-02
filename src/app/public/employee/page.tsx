"use client";

import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGetReviewByPublicIdQuery } from "@/GlobalRedux/Features/company/companyApi";

export default function EmployeeInfoPage() {
  return (
    <Suspense fallback={<Loader />}>
      <EmployeeInfoContent />
    </Suspense>
  );
}

function EmployeeInfoContent() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || "";
  const employeeId = searchParams.get("employeeId") || "";
  const { setModal } = useModalContext();

  const { data, isLoading, isSuccess } = useGetReviewByPublicIdQuery({
    companyId,
    employeeId,
  });

  const employee = data?.employee?.[0];
  const reviews = employee?.review || [];

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
