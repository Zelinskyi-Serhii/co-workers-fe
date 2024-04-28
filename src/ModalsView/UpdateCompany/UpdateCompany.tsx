import { useUpdateCompanyMutation } from "@/GlobalRedux/Features/company/companyApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { minValueForCompanyOwned, today } from "@/constants";
import { useModalContext } from "@/context/ModalContext";
import { convertDateToISOString } from "@/helpers/helperFunctions";
import { useClickOutside } from "@/hooks/useClickOutside";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateCompanyValidationSchema } from "./validation";
import { TextField } from "@/components/TextField";

type FormValues = {
  name: string;
  ownerName: string;
  ownedAt: string;
};

export const UpdateCompany = () => {
  const { modal, handleCloseModal, handleCloseWithRefetch } = useModalContext();
  const { companyForUpdate } = modal;
  const companyRef = useRef(null);
  useClickOutside(companyRef, () => handleCloseModal());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [{ avatarUrl, id }, setUpdateCompany] = useState({
    ...companyForUpdate!,
    ownedAt: convertDateToISOString(companyForUpdate?.ownedAt!).slice(0, 10),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(updateCompanyValidationSchema),
    defaultValues: {
      ...companyForUpdate!,
      ownedAt: convertDateToISOString(companyForUpdate?.ownedAt!).slice(0, 10),
    },
  });

  const [updateCompany, { isSuccess, isLoading, isError }] =
    useUpdateCompanyMutation();

  const isCompanyChange = () => {
    return (
      watch().name !== companyForUpdate?.name ||
      avatarUrl !== companyForUpdate?.avatarUrl ||
      convertDateToISOString(companyForUpdate.ownedAt).slice(0, 10) !==
        watch().ownedAt ||
      watch().ownerName !== companyForUpdate.ownerName
    );
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

  const handleUpdateCompany = async (values: FormValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("ownerName", values.ownerName);
    formData.append("ownedAt", new Date(values.ownedAt).toISOString());
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
      handleCloseWithRefetch();
    }

    if (isError) {
      toast.error("Unable to update company");
    }
  }, [handleCloseWithRefetch, isError, isSuccess]);

  return (
    <form
      ref={companyRef}
      className="max-w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      onSubmit={handleSubmit(handleUpdateCompany)}
    >
      <h2 className="text-center mb-[20px] text-[30px] text-[#FFF] truncate max-w-[400px]">
        Update{" "}
        <span className="font-semibold">{modal.companyForUpdate?.name}</span>
      </h2>

      <div className="flex flex-col gap-[15px] [&>label]:text-[#999999] mb-[20px]">
        <TextField
          title={"Company name"}
          {...register("name")}
          helpText={errors.name?.message}
          style={{ color: "#000" }}
        />

        <TextField
          title={"Owner Name"}
          {...register("ownerName")}
          helpText={errors.ownerName?.message}
          style={{ color: "#000" }}
        />

        <TextField
          title={"Owner At"}
          type="date"
          min={minValueForCompanyOwned}
          max={today}
          {...register("ownedAt")}
          helpText={errors.ownedAt?.message}
          style={{ color: "#000" }}
        />

        <Image
          className="mx-auto max-w-[150px] max-h-[150px] object-contain"
          alt="Example"
          width={100}
          height={100}
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

      <div className="flex justify-between w-[100%] [&>button]:p-4 [&>button]:w-[49%] [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          type="submit"
          isDisabled={!isCompanyChange()}
        >
          Update
        </Button>
      </div>
    </form>
  );
};
