"use client";

import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import { useAddNewReviewMutation } from "@/GlobalRedux/Features/review/reviewApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { reviewValidationSchema } from "./validation";

type FormValues = {
  review: string;
};

export const AddReview = () => {
  const { modal, handleCloseModal, handleCloseWithRefetch } = useModalContext();
  const router = useRouter();
  const { id, firstname, lastname } = modal.employeeReviewAdd as IEmployee;
  const addReviewRef = useRef(null);
  useClickOutside(addReviewRef, () => handleCloseModal());
  const [addNewReview, { isSuccess, isError, isLoading }] =
    useAddNewReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewValidationSchema),
  });

  const handleAddNewReview = (values: FormValues) => {
    addNewReview({ employeeId: id, review: values.review });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Thank you. Your Review added successfully");
      handleCloseWithRefetch();
    }

    if (isError) {
      toast.error("Unable to add review");
    }
  }, [handleCloseWithRefetch, isError, isSuccess, router]);

  return (
    <form
      className="max-w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={addReviewRef}
      onSubmit={handleSubmit(handleAddNewReview)}
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
        {...register("review")}
      />

      <div className="relative flex gap-4 justify-center">
        {errors.review && (
          <span
            className="absolute left-0 text-red-400 text-[12px]"
            style={{ top: "-30px" }}
          >
            {errors.review?.message}
          </span>
        )}
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
