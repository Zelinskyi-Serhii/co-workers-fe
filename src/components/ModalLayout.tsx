"use client";

import { AuthModal } from "@/ModalsView/AuthModal/AuthModal";
import { ModalType, useModalContext } from "@/context/ModalContext";

export const ModalLayout = () => {
  const { isOpen, modalType } = useModalContext().modal;

  const isOpenAuthModal = modalType === ModalType.AUTH && isOpen;

  return (
    <>
      {isOpen ? (
        <div className="modalViewContainer">
          {isOpenAuthModal && <AuthModal />}
        </div>
      ) : null}
    </>
  );
};
