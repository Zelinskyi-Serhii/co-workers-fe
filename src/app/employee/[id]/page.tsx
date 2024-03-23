"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/GlobalRedux/Features/employee/employeeApi";
import { useEffect } from "react";
import { useGetAllReviewsQuery } from "@/GlobalRedux/Features/review/reviewApi";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { Loader } from "@/components/Loader";

export default function EmployeeInfo(props: any) {
  const { id } = props.params;
  const { setModal } = useModalContext();
  const router = useRouter();
  const [
    deleteEmployee,
    {
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
    },
  ] = useDeleteEmployeeMutation();

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

  const handleDeleteEmployee = () => {
    deleteEmployee({ employeeId: id });
  };

  const handleAddNewReview = () => {
    setModal({
      employeeReviewAdd: employee,
      isOpen: true,
      modalType: ModalType.REVIEW,
    });
  };

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("Employee deleted successfully");
      router.push("/company");
    }

    if (isErrorDelete) {
      toast.error("Unable to delete employee");
    }
  }, [isErrorDelete, isSuccessDelete, router]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mb-[30px] relative">
            <h1 className="text-[#FFF] text-center font-semibold text-[30px]">
              <span className="opacity-60">All Review about</span>
              {fullname}
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
