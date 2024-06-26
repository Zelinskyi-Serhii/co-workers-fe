"use client";

import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetReviewByPublicIdQuery } from "@/GlobalRedux/Features/company/companyApi";
import { GoBackButton } from "@/components/GoBackButton";

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

  const { data, isLoading, isSuccess, refetch } = useGetReviewByPublicIdQuery({
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
      closeModalCallback: refetch,
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
            <h1 className="mt-[30px] md:mt-0 flex flex-wrap items-center  md:flex-nowrap justify-center gap-[15px] text-[#FFF] text-center font-semibold text-[30px] relative">
              <GoBackButton className="absolute left-0 top-[-40px] md:top-5" />
              <span className="opacity-60">All Review about</span>

              {employee && (
                <>
                  <span className=" truncate max-w-[300px]">{fullname}</span>
                  <span className="bg-[#FFF]">
                    <Image
                      alt={employee.firstname}
                      src={employee.avatarUrl}
                      width={50}
                      height={10}
                    />
                  </span>
                </>
              )}
            </h1>
            <div className="absolute top-[-50px] md:top-2 right-0">
              <Button onClick={handleAddNewReview}>+ Add new Review</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-[15px]">
            {reviews?.map((review) => (
              <ReviewCard reviewData={review} key={review.id} />
            ))}
          </div>
        </>
      )}

      {isSuccess && !reviews.length && (
        <h3 className="mt-[60px] text-center mb-4 text-3xl text-[#FFF]">
          This employee have not any reviews yet.
        </h3>
      )}
    </>
  );
}
