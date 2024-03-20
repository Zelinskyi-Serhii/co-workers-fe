"use client";

import { AddReview } from "@/ModalsView/AddReview/AddReview";
import { AuthModal } from "@/ModalsView/AuthModal/AuthModal";
import { ConfirmModal } from "@/ModalsView/Confirm/Confirm";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useEffect } from "react";

export const ModalLayout = () => {
  const { isOpen, modalType, employeeReviewAdd, confirmState } =
    useModalContext().modal;

  const isOpenAuthModal = modalType === ModalType.AUTH;
  const isOpenAddReviewModal =
    modalType === ModalType.REVIEW && employeeReviewAdd;
  const isOpenConfirmModal = modalType === ModalType.CONFIRM && confirmState;

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "visible";
    }

    return () => {
      window.document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="modalViewContainer">
          {isOpenAuthModal && <AuthModal />}
          {isOpenAddReviewModal && <AddReview />}
          {isOpenConfirmModal && <ConfirmModal />}
        </div>
      ) : null}
    </>
  );
};
