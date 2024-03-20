import { Button, ButtonColorByType } from "@/components/Button";
import { IConfirm, useModalContext } from "@/context/ModalContext";
import { useRef, useState } from "react";

export const ConfirmModal = () => {
  const { confirmState } = useModalContext().modal;
  const { title, desciprion, cancel, confirm } = confirmState as IConfirm;
  const [isLoading, setIsLoading] = useState(false);
  const confirmRef = useRef(null);

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      await confirm();
      cancel();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={confirmRef}
    >
      <h2
        className="text-center text-[#FFF] font-semibold mb-[20px]"
        style={{ fontSize: 24 }}
      >
        {title}
      </h2>

      <p className="mb-[30px] text-[#FFF]">{desciprion}</p>

      <div className="flex gap-4 justify-center">
        <Button buttonType={ButtonColorByType.DELETE} onClick={cancel}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} isLoading={isLoading}>
          Delete
        </Button>
      </div>
    </div>
  );
};
