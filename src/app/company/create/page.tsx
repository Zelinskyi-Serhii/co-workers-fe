"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button, ButtonColorByType } from "@/components/Button";
import { useCreateNewCompanyMutation } from "@/GlobalRedux/Features/company/companyApi";
import { minValueForCompanyOwned, today } from "@/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCompanyValidationSchema } from "./validation";
import { TextField } from "@/components/TextField";

type FormValues = {
  name: string;
  ownerName: string;
  ownedAt: string;
};

export default function CompanyCreate() {
  const [createCompany, { isLoading, isSuccess, isError }] =
    useCreateNewCompanyMutation();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCompanyValidationSchema),
  });

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleCreateCompany = async (values: FormValues) => {
    if (!imageFile) {
      toast.error("Company logo is required");
      return;
    }

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("ownerName", values.ownerName);
    formData.append("ownedAt", new Date(values.ownedAt).toISOString());
    formData.append("avatarUrl", imageFile);

    createCompany(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Company created successfully");
      router.back();
    }
    if (isError) {
      toast.error("Unable to create company");
    }
  }, [isSuccess, isError, router]);

  return (
    <div className="w-[500px] mx-auto bg-[#232323] border rounded-xl overflow-hidden">
      <h2 className="bg-[#1976d2] p-[10px] text-[#FFF] text-center text-lg font-semibold">
        New Company
      </h2>

      <form
        className="flex flex-col gap-[10px] justify-between p-[20px]"
        onSubmit={handleSubmit(handleCreateCompany)}
      >
        <div className="flex flex-col gap-[15px] [&>label]:text-[#999999]">
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
            className="mx-auto w-[150px] h-[150px] rounded-[50%]"
            alt="Example"
            width={150}
            height={150}
            src={avatarUrl || "https://placehold.co/200x200"}
          />

          <Button className="mx-auto">
            <label>
              Add Company Logo
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

        <div className="flex justify-between w-[100%] [&>button]:p-4 [&>button]:w-[49%] [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
          <Button
            buttonType={ButtonColorByType.DELETE}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            // onClick={handleCreateCompany}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
