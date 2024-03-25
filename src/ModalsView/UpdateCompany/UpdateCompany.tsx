import { useUpdateCompanyMutation } from "@/GlobalRedux/Features/company/companyApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { useModalContext } from "@/context/ModalContext";
import {
  convertDateToISOString,
  isValidFormData,
} from "@/helpers/helperFunctions";
import { useClickOutside } from "@/hooks/useClickOutside";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const UpdateCompany = () => {
  const { modal, handleCloseModal } = useModalContext();
  const { companyForUpdate } = modal;
  const companyRef = useRef(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [{ name, avatarUrl, ownedAt, ownerName, id }, setUpdateCompany] =
    useState({
      ...companyForUpdate!,
      ownedAt: convertDateToISOString(companyForUpdate?.ownedAt!).slice(0, 10),
    });
  useClickOutside(companyRef, () => handleCloseModal());
  const [updateCompany, { isSuccess, isLoading, isError }] =
    useUpdateCompanyMutation();

  const isDisabled = isValidFormData(name, ownerName, ownedAt, avatarUrl);

  const isCompanyChange = () => {
    return (
      name !== companyForUpdate?.name ||
      avatarUrl !== companyForUpdate?.avatarUrl ||
      convertDateToISOString(companyForUpdate.ownedAt).slice(0, 10) !==
        ownedAt ||
      ownerName !== companyForUpdate.ownerName
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdateCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setUpdateCompany((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateCompany = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("ownerName", ownerName);
    formData.append("ownedAt", new Date(ownedAt).toISOString());
    formData.append("id", String(id));

    if (imageFile) {
      formData.append("avatarUrl", imageFile);
    }

    updateCompany({
      newCompany: formData,
      companyId: Number(id),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Company updated successfully");
      handleCloseModal();
    }

    if (isError) {
      toast.error("Unable to update company");
    }
  }, [handleCloseModal, isError, isSuccess]);

  return (
    <div
      ref={companyRef}
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
    >
      <h2 className="text-center mb-[20px] text-[30px] text-[#FFF]">
        Update{" "}
        <span className="font-semibold">{modal.companyForUpdate?.name}</span>
      </h2>

      <div className="flex flex-col gap-[15px] [&>label]:text-[#999999] mb-[20px]">
        <label className="flex flex-col gap-[2px] text-[#FFF]">
          Company name
          <input
            className="p-[6px] rounded-xl text-[#000]"
            placeholder="Enter name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-[2px] text-[#FFF]">
          Owner Name
          <input
            className="p-[6px] rounded-xl text-[#000]"
            type="text"
            placeholder="Enter Owner"
            name="ownerName"
            value={ownerName}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-[2px] text-[#FFF]">
          Owned At
          <input
            className="p-[6px] rounded-xl text-[#000]"
            type="date"
            name="ownedAt"
            value={ownedAt}
            onChange={handleChange}
          />
        </label>

        <Image
          className="rounded-[50%] mx-auto w-[150px] h-[150px]"
          alt="Example"
          width={150}
          height={150}
          src={avatarUrl || "https://placehold.co/200x200"}
        />

        <div className="mx-auto">
          <Button>
            <label>
              Change Logo
              <input
                className="hidden"
                type="file"
                accept="image/png, image/jpeg"
                name="avatarUrl"
                onChange={handleUploadImage}
              />
            </label>
          </Button>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdateCompany}
          isLoading={isLoading}
          isDisabled={!isCompanyChange() || isDisabled}
        >
          Update
        </Button>
      </div>
    </div>
  );
};
