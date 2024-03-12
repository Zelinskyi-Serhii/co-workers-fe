"use client";

import { FC, ReactNode, useState } from "react";
import { createStrictContext, useStrictContext } from "./strictContext";

export enum ModalType {
  AUTH = "auth",
}

interface ModalState {
  modalType?: ModalType;
  isOpen: boolean;
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
