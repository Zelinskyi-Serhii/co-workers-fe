"use client";

import { AddReview } from "@/ModalsView/AddReview/AddReview";
import { AuthModal } from "@/ModalsView/AuthModal/AuthModal";
import { DeleteCompany } from "@/ModalsView/DeleteCompany/DeleteCompany";
import { DeleteEmployee } from "@/ModalsView/DeleteEmployee/DeleteEmployee";
import { DismissEmployee } from "@/ModalsView/DismissEmployee/DismissEmployee";
import { ReadReview } from "@/ModalsView/ReadReview/ReadReview";
import { UpdateCompany } from "@/ModalsView/UpdateCompany/UpdateCompany";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { useEffect } from "react";

export const ModalLayout = () => {
  const { isOpen, modalType, employeeReviewAdd } = useModalContext().modal;

  const isOpenAuthModal = modalType === ModalType.AUTH;
  const isOpenAddReviewModal = modalType === ModalType.REVIEW;
  const isOpenConfirmModal = modalType === ModalType.DELETE_COMPANY;
  const isOpenDismissModal = modalType === ModalType.DISMISS_EMPLOYEE;
  const isOpenReadReview = modalType === ModalType.READ_REVIEW;
  const isOpenUpdateCompany = modalType === ModalType.UPDATE_COMPANY;
  const isOpenDeleteEmployee = modalType === ModalType.DELETE_EMPLOYEE;

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
          {isOpenConfirmModal && <DeleteCompany />}
          {isOpenDismissModal && <DismissEmployee />}
          {isOpenReadReview && <ReadReview />}
          {isOpenUpdateCompany && <UpdateCompany />}
          {isOpenDeleteEmployee && <DeleteEmployee />}
        </div>
      ) : null}
    </>
  );
};
