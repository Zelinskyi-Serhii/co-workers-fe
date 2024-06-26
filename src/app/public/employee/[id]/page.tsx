"use client";

import { useGetEmployeeByIdQuery } from "@/GlobalRedux/Features/employee/employeeApi";
import { useGetAllReviewsQuery } from "@/GlobalRedux/Features/review/reviewApi";
import { ReviewCard } from "@/components/ReviewCard";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import { GoBackButton } from "@/components/GoBackButton";

export default function EmployeeInfo(props: any) {
  const { id } = props.params;

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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mb-[30px] relative">
            <h1 className="mt-[30px] md:mt-0 flex flex-wrap md:flex-nowrap justify-center items-center gap-[15px] text-[#FFF] text-center font-semibold text-[30px] relative">
              <GoBackButton className="absolute left-0 top-[-40px] md:top-2" />
              <span className="opacity-60">All Review about</span>

              {employee && (
                <div className="flex items-center gap-4">
                  <span className=" truncate max-w-[300px]">{fullname}</span>
                  <span className="bg-[#FFF]">
                    <Image
                      alt={employee.firstname}
                      src={employee.avatarUrl}
                      width={50}
                      height={10}
                    />
                  </span>
                </div>
              )}
            </h1>
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
