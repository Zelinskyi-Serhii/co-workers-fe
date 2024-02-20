"use client";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import * as companyActions from "@/GlobalRedux/Features/companySlice";
import { Loader } from "@/components/Loader";
import { isValidFormData } from "@/helpers/helperFunctions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialValue = {
  name: "",
  ownerName: "",
  ownedAt: new Date().toISOString(),
  avatarUrl: "",
};

export default function CompanyCreate() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.company);
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
    if (!imageFile || isDisabled) return;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("ownerName", ownerName);
    formData.append("ownedAt", new Date(ownedAt).toISOString());
    formData.append("avatarUrl", imageFile);

    const res = await dispatch(companyActions.createCompany(formData));

    if (!res.payload) {
      toast.error("Unable to create company");
    } else {
      toast.success("Company created successfully");
      router.push("/company");
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-between items-center lg:items-stretch lg:gap-0 lg:flex-row border border-[#B4B4B8] rounded-lg p-6">
      <div className="flex flex-col gap-4 lg:w-[60%] w-[100%] [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&>label]:text-[#B4B4B8] [&>label>input]:p-3 [&>label>input]:text-black [&>label>input]:border [&>label>input]:border-color-[#B4B4B8]">
        <label>
          Company name
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

        <label>
          Owner Name
          <input
            type="text"
            placeholder="Enter Owner"
            name="ownerName"
            value={ownerName}
            onChange={handleChange}
          />
        </label>

        <label>
          Owned At
          <input
            className="w-[200px]"
            type="date"
            name="ownedAt"
            value={ownedAt}
            onChange={handleChange}
          />
        </label>

        <label>
          <p className="p-3 bg-[#1976d2] text-white min-w-fit w-[50%] text-center font-bold mx-auto cursor-pointer hover-scale">
            Upload Company logo
          </p>
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg"
            name="avatarUrl"
            onChange={handleUploadImage}
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 items-center lg:w-[35%] w-[100%] justify-between">
        <Image
          className="rounded-xl"
          alt="Example"
          width={200}
          height={200}
          src={avatarUrl || "https://placehold.co/200x200"}
        />

        <div className="flex justify-between w-[100%] [&>button]:p-4 [&>button]:w-[49%] [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
          <button className="bg-[#DC004E] hover-scale">
            <Link href="/company">Cancel</Link>
          </button>
          <button
            className="flex items-center justify-center bg-[#1976d2] hover-scale"
            onClick={handleCreateCompany}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? <Loader /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
