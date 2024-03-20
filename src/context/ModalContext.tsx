"use client";

import { FC, ReactNode, useState } from "react";
import { createStrictContext, useStrictContext } from "./strictContext";
import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";

export enum ModalType {
  AUTH = "auth",
  REVIEW = "review",
  CONFIRM = "confirm",
}

export interface IConfirm {
  title: string;
  desciprion: string;
  cancel: () => void;
  confirm: () => void;
}

interface ModalState {
  modalType?: ModalType;
  isOpen: boolean;
  employeeReviewAdd?: IEmployee | null;
  confirmState?: IConfirm | null;
}

interface IModalContext {
  modal: ModalState;
  setModal: (state: ModalState) => void;
}

const initialState = {
  isOpen: false,
};

const ModalContext = createStrictContext<IModalContext | null>();

export const ModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState(initialState);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext(): IModalContext {
  return useStrictContext(ModalContext);
}
