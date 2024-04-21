"use client";

import { FC, ReactNode, useState } from "react";
import { createStrictContext, useStrictContext } from "./strictContext";
import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import { ICompany } from "@/GlobalRedux/Features/company/companyApi";
import { IReview } from "@/GlobalRedux/Features/review/reviewApi";

export enum ModalType {
  AUTH = "auth",
  REVIEW = "review",
  READ_REVIEW = "read review",
  DELETE_COMPANY = "delete company",
  UPDATE_COMPANY = "update company",
  DISMISS_EMPLOYEE = "dismiss employee",
  DELETE_EMPLOYEE = "delete employee",
  RESET_PASSWORD = "reset password",
}

interface ModalState {
  modalType?: ModalType;
  isOpen: boolean;
  employeeReviewAdd?: IEmployee | null;
  employeeForDismiss?: IEmployee | null;
  employeeForDelete?: IEmployee | null;
  companyForDelete?: ICompany | null;
  companyForUpdate?: ICompany | null;
  review?: IReview;
  closeModalCallback?: () => void;
}

interface IModalContext {
  modal: ModalState;
  setModal: (state: ModalState) => void;
  handleCloseModal: () => void;
  handleCloseWithRefetch: () => void;
}

const initialState = {
  isOpen: false,
  // modalType: ModalType.RESET_PASSWORD,
};

const ModalContext = createStrictContext<IModalContext | null>();

export const ModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ModalState>(initialState);

  const handleCloseModal = () => {
    setModal(initialState);
  };

  const handleCloseWithRefetch = () => {
    modal.closeModalCallback?.();
    setModal(initialState);
  };

  return (
    <ModalContext.Provider
      value={{ modal, setModal, handleCloseModal, handleCloseWithRefetch }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext(): IModalContext {
  return useStrictContext(ModalContext);
}
