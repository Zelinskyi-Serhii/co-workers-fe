"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useDeleteEmployeeMutation,
  useDismissEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/GlobalRedux/Features/employee/employeeApi";
import { useEffect } from "react";
import { useGetAllReviewsQuery } from "@/GlobalRedux/Features/review/reviewApi";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/Button";
import { ModalType, useModalContext } from "@/context/ModalContext";

export default function EmployeeInfo(props: any) {
  const { id } = props.params;
  const { setModal } = useModalContext();
  const router = useRouter();
  const [
    dismissEmployee,
    {
      isLoading: isLoadingDismiss,
      isSuccess: isSuccessDismiss,
      isError: isErrorDismiss,
    },
  ] = useDismissEmployeeMutation();
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
  const { data: reviews } = useGetAllReviewsQuery({ employeeId: id });

  const handleDeleteEmployee = async () => {
    deleteEmployee({ employeeId: id });
  };

  const handleDismissEmployee = async () => {
    dismissEmployee({ employeeId: id });
  };

  const handleAddNewReview = () => {
    setModal({
      employeeReviewAdd: employee,
      isOpen: true,
      modalType: ModalType.REVIEW,
    });
  };

  useEffect(() => {
    if (isSuccessDismiss) {
      toast.success("Employee updated successfully");
    }

    if (isSuccessDelete) {
      toast.success("Employee deleted successfully");
      router.push("/company");
    }

    if (isErrorDelete) {
      toast.error("Unable to delete employee");
    }

    if (isErrorDismiss) {
      toast.error("Unable to update employee");
    }
  }, [
    isErrorDelete,
    isErrorDismiss,
    isSuccessDelete,
    isSuccessDismiss,
    router,
  ]);

  return (
    <>
      {employee && (
        <div>
          <div className="mb-[30px] relative">
            <h1 className="text-[#FFF] text-center font-semibold text-[30px]">
              <span className="opacity-60">All Review about</span>
              {` ${employee.firstname} ${employee.lastname}`}
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
        </div>
      )}
    </>
  );
}
