import { useDismissEmployeeMutation } from "@/GlobalRedux/Features/employee/employeeApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { today } from "@/constants";
import { useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { dismissEmployeeValidationSchema } from "./validation";
import { TextField } from "@/components/TextField";

type FormValues = {
  dismissDate: string;
};

export const DismissEmployee = () => {
  const { modal, handleCloseModal, handleCloseWithRefetch } = useModalContext();
  const { employeeForDismiss } = modal;
  const dismissRef = useRef(null);
  const [dismissEmployee, { isLoading }] = useDismissEmployeeMutation();

  const minValueForDismiss = (
    employeeForDismiss?.hireDate as unknown as string
  ).split("T")[0];

  useClickOutside(dismissRef, () => handleCloseModal());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dismissEmployeeValidationSchema),
  });

  const handleConfirm = async (values: FormValues) => {
    if (!employeeForDismiss) return;

    try {
      await dismissEmployee({
        employeeId: employeeForDismiss.id,
        dismissed: new Date(values.dismissDate).toISOString(),
      });
      toast.success("Employee dismisses successfully");
      handleCloseWithRefetch();
    } catch (error) {
      toast.error("Unable to dismiss employee. Please try again later.");
    }
  };

  return (
    <form
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={dismissRef}
      onSubmit={handleSubmit(handleConfirm)}
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

      <div className="mx-auto mb-[30px] w-[200px] [&_span]:text-[#FFF]">
        <TextField
          {...register("dismissDate")}
          helpText={errors.dismissDate?.message}
          style={{ color: "#000" }}
          min={minValueForDismiss}
          max={today}
          type="date"
        />
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading} type="submit">
          Dismiss
        </Button>
      </div>
    </form>
  );
};
