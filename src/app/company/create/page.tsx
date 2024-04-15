"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isValidFormData } from "@/helpers/helperFunctions";
import { Button, ButtonColorByType } from "@/components/Button";
import { useCreateNewCompanyMutation } from "@/GlobalRedux/Features/company/companyApi";
import { minValueForCompanyOwned, today } from "@/constants";

const initialValue = {
  name: "",
  ownerName: "",
  ownedAt: "",
  avatarUrl: "",
};

export default function CompanyCreate() {
  const [createCompany, { isLoading, isSuccess, isError }] =
    useCreateNewCompanyMutation();
  const router = useRouter();
  const [{ name, ownerName, ownedAt, avatarUrl }, setCompany] =
    useState(initialValue);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isDisabled = isValidFormData(name, ownerName, ownedAt, avatarUrl);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCompany((prev) => ({
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
      setCompany((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleCreateCompany = async () => {
    if (!imageFile || isDisabled) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("ownerName", ownerName);
    formData.append("ownedAt", new Date(ownedAt).toISOString());
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

      <div className="flex flex-col gap-[10px] justify-between p-[20px]">
        <div className="flex flex-col gap-[15px] [&>label]:text-[#999999]">
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
              min={minValueForCompanyOwned}
              max={today}
            />
          </label>

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
            onClick={handleCreateCompany}
            isDisabled={isDisabled}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
