import { useDismissEmployeeMutation } from "@/GlobalRedux/Features/employee/employeeApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { today } from "@/constants";
import { useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export const DismissEmployee = () => {
  const { modal, handleCloseModal } = useModalContext();
  const { employeeForDismiss } = modal;
  const dismissRef = useRef(null);
  const [dismissDate, setDismissDate] = useState("");
  const [dismissEmployee, { isLoading }] = useDismissEmployeeMutation();

  const minValueForDismiss = (
    employeeForDismiss?.hireDate as unknown as string
  ).split("T")[0];

  useClickOutside(dismissRef, () => handleCloseModal());

  const handleConfirm = async () => {
    if (!employeeForDismiss) return;

    try {
      await dismissEmployee({
        employeeId: employeeForDismiss.id,
        dismissed: new Date(dismissDate).toISOString(),
      });
      toast.success("Employee dismisses successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Unable to dismiss employee. Please try again later.");
    }
  };

  return (
    <div
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={dismissRef}
    >
      <h2
        className="text-center text-[#FFF] font-semibold mb-[20px]"
        style={{ fontSize: 24 }}
      >
        Dismiss Employee
      </h2>

      <p className="mb-[20px] text-[#FFF] text-center">
        When was last working day for {employeeForDismiss?.firstname}{" "}
        {employeeForDismiss?.lastname}?
      </p>

      <div className="flex justify-center mb-[30px]">
        <input
          className="p-[6px] rounded-xl text-[#000]"
          type="date"
          name="ownedAt"
          value={dismissDate}
          onChange={({ target }) => setDismissDate(target.value)}
          min={minValueForDismiss}
          max={today}
        />
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          isLoading={isLoading}
          isDisabled={!dismissDate}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
};
