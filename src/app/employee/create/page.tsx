"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { Loader } from "@/components/Loader";
import { isValidFormData } from "@/helpers/helperFunctions";
import * as employeeSlice from "@/GlobalRedux/Features/employee/employeeSlice";
import { toast } from "react-toastify";

const initialState = {
  firstname: "Serhii",
  lastname: "Zel",
  position: "Frontend",
  avatarUrl: "",
  hireDate: new Date().toISOString(),
  birthday: new Date().toISOString(),
};

export default function CreateEmployee() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.employee);
  const router = useRouter();
  // todo: issues with search params in deployment version
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || 0;
  const [
    { firstname, lastname, position, avatarUrl, hireDate, birthday },
    setEmployee,
  ] = useState(initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isDisabled = isValidFormData(
    firstname,
    lastname,
    position,
    hireDate,
    avatarUrl
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEmployee((prev) => ({
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
      setEmployee((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleCreateEmployee = async () => {
    if (!imageFile || isDisabled || !companyId) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("position", position);
    formData.append("companyId", companyId as string);
    formData.append("hireDate", new Date(hireDate).toISOString());
    formData.append("birthday", new Date(birthday).toISOString());
    formData.append("avatarUrl", imageFile);

    const response = await dispatch(employeeSlice.createEmployee(formData));

    if (response.payload) {
      toast.success("Employee created successfully");
      router.push(`/company/${companyId}`);
    } else {
      toast.error("Unable to create Employee");
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-between items-center lg:items-stretch lg:gap-0 lg:flex-row border border-[#B4B4B8] rounded-lg p-6">
      <div className="flex flex-col gap-4 lg:w-[60%] w-[100%] [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&>label]:text-[#B4B4B8] [&>label>input]:p-3 [&>label>input]:text-black [&>label>input]:border [&>label>input]:border-color-[#B4B4B8]">
        <label>
          Employee firstname
          <input
            type="text"
            placeholder="Enter Firstname"
            name="firstname"
            value={firstname}
            onChange={handleChange}
          />
        </label>

        <label>
          Employee lastname
          <input
            type="text"
            placeholder="Enter Lastname"
            name="lastname"
            value={lastname}
            onChange={handleChange}
          />
        </label>

        <label>
          Job Position
          <input
            placeholder="Enter Job Position"
            type="text"
            name="position"
            value={position}
            onChange={handleChange}
          />
        </label>

        <div className="flex justify-between [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&>label]:text-[#B4B4B8] [&>label>input]:p-3 [&>label>input]:text-black [&>label>input]:border [&>label>input]:border-color-[#B4B4B8]">
          <label>
            Birthday
            <input
              className="w-[150px] lg:w-[250px]"
              type="date"
              name="birthday"
              value={birthday}
              onChange={handleChange}
            />
          </label>

          <label>
            Hire Date
            <input
              className="w-[150px] md:w-[250px]"
              type="date"
              name="hireDate"
              value={hireDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          <p className="p-3 bg-[#1976d2] text-white min-w-fit w-[50%] text-center font-bold mx-auto cursor-pointer hover-scale">
            Upload Employee Image
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
            <Link href={`/company/${companyId}`}>Cancel</Link>
          </button>
          <button
            className="flex items-center justify-center bg-[#1976d2] hover-scale"
            onClick={handleCreateEmployee}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
