import { useDeleteCompanyByIdMutation } from "@/GlobalRedux/Features/company/companyApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { useModalContext } from "@/context/ModalContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";
import { toast } from "react-toastify";

export const DeleteCompany = () => {
  const { modal, handleCloseModal } = useModalContext();
  const deleteRef = useRef(null);
  const { companyForDelete } = modal;

  const [deleteCompany, { isLoading }] = useDeleteCompanyByIdMutation();

  useClickOutside(deleteRef, () => handleCloseModal());

  const handleConfirm = async () => {
    if (!companyForDelete) return;

    try {
      await deleteCompany({ companyId: String(companyForDelete.id) });
      toast.success("Company deleted successfully");

      handleCloseModal();
    } catch (error) {
      toast.error("Unable to delete company");
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
        Delete Company
      </h2>

      <p className="mb-[30px] text-[#FFF] text-center">
        Do you realy want to delete company permanently?
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
