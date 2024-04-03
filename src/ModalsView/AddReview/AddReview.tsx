"use client";

import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import { useAddNewReviewMutation } from "@/GlobalRedux/Features/review/reviewApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const AddReview = () => {
  const { modal, setModal } = useModalContext();
  const router = useRouter();
  const { id, firstname, lastname } = modal.employeeReviewAdd as IEmployee;
  const [review, setReview] = useState("");
  const addReviewRef = useRef(null);
  const [addNewReview, { isSuccess, isError, isLoading }] =
    useAddNewReviewMutation();

  const handleAddNewReview = () => {
    addNewReview({ employeeId: id, review });
  };

  useClickOutside(addReviewRef, () => handleCloseModal());

  const handleCloseModal = () => {
    setModal({ isOpen: false, employeeReviewAdd: null });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Thank you. Your Review added successfully");
      setModal({ isOpen: false, employeeReviewAdd: null });
      router.back();
    }

    if (isError) {
      toast.error("Unable to add review");
    }
  }, [isError, isSuccess, router, setModal]);

  return (
    <div
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={addReviewRef}
    >
      <h2
        className="text-center text-[#FFF] font-semibold mb-[20px]"
        style={{ fontSize: 24 }}
      >
        Add new review for {firstname} {lastname}
      </h2>

      <textarea
        className="w-[100%] mb-[30px] rounded-xl px-4 py-2"
        style={{ resize: "none", minHeight: 200 }}
        maxLength={500}
        value={review}
        onChange={({ target }) => setReview(target.value)}
      />

      <div className="flex gap-4 justify-center">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          isDisabled={!review.trim()}
          onClick={handleAddNewReview}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
