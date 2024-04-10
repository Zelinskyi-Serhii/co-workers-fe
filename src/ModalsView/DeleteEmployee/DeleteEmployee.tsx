import { useDeleteCompanyByIdMutation } from "@/GlobalRedux/Features/company/companyApi";
import { useDeleteEmployeeMutation } from "@/GlobalRedux/Features/employee/employeeApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";
import { toast } from "react-toastify";

export const DeleteEmployee = () => {
  const { modal, handleCloseModal, handleCloseWithRefetch } = useModalContext();
  const deleteRef = useRef(null);
  const { employeeForDelete } = modal;

  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();

  useClickOutside(deleteRef, () => handleCloseModal());

  const handleConfirm = async () => {
    if (!employeeForDelete) return;

    try {
      await deleteEmployee({ employeeId: employeeForDelete.id });
      toast.success("Employee deleted successfully");

      handleCloseWithRefetch();
    } catch (error) {
      toast.error("Unable to delete employee");
    }
  };

  return (
    <div
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={deleteRef}
    >
      <h2
        className="text-center text-[#FFF] font-semibold mb-[20px]"
        style={{ fontSize: 24 }}
      >
        Delete Employee
      </h2>

      <p className="mb-[30px] text-[#FFF] text-center">
        {`Do you realy want to delete ${employeeForDelete?.firstname} ${employeeForDelete?.lastname} permanently?`}
      </p>

      <div className="flex gap-4 justify-center">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} isLoading={isLoading}>
          Delete
        </Button>
      </div>
    </div>
  );
};
