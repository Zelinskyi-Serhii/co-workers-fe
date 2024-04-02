"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, Suspense, useEffect } from "react";
import { Loader } from "@/components/Loader";
import { isValidFormData } from "@/helpers/helperFunctions";
import { toast } from "react-toastify";
import { useCreateEmployeeMutation } from "@/GlobalRedux/Features/employee/employeeApi";
import { Button, ButtonColorByType } from "@/components/Button";
import { useGetCompanyByIdQuery } from "@/GlobalRedux/Features/company/companyApi";
import {
  maxValueForEmployeeBirthday,
  minValueForEmployeeBirthday,
  minValueForEmployeeHireDate,
  today,
} from "@/constants";

const initialState = {
  firstname: "Serhii",
  lastname: "Zel",
  position: "Frontend",
  avatarUrl: "",
  hireDate: new Date().toISOString(),
  birthday: new Date().toISOString(),
};

export default function CreateEmployeePage() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateEmployee />
    </Suspense>
  );
}

const CreateEmployee = () => {
  const [createEmployee, { isLoading, isSuccess, isError }] =
    useCreateEmployeeMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") || 0;
  const { data: company } = useGetCompanyByIdQuery({
    companyId: String(companyId),
  });
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

    createEmployee(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Employee created successfully");
      router.push(`/company/${companyId}`);
    }

    if (isError) {
      toast.error("Unable to create Employee");
    }
  }, [companyId, isError, isSuccess, router]);

  return (
    <div className="w-[500px] mx-auto bg-[#232323] border rounded-xl overflow-hidden">
      <h2 className="bg-[#1976d2] p-[10px] text-[#FFF] text-center text-lg font-semibold">
        New Employee for {company?.name}
      </h2>

      <div className="flex flex-col gap-[10px] justify-between p-[20px]">
        <div className="flex flex-col gap-[15px] [&>label]:text-[#999999]">
          <label className="flex flex-col gap-[2px] text-[#FFF]">
            First Name
            <input
              className="p-[6px] rounded-xl text-[#000]"
              placeholder="Enter name"
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col gap-[2px] text-[#FFF]">
            Last Name
            <input
              className="p-[6px] rounded-xl text-[#000]"
              type="text"
              placeholder="Enter name"
              name="lastname"
              value={lastname}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col gap-[2px] text-[#FFF]">
            Job Position
            <input
              className="p-[6px] rounded-xl text-[#000]"
              type="text"
              placeholder="Enter name"
              name="position"
              value={position}
              onChange={handleChange}
            />
          </label>

          <div className="flex justify-between gap-[20px] [&>label]:text-[#999999] [&>label]:flex-[1]">
            <label className="flex flex-col gap-[2px] text-[#FFF] mb-[15px]">
              Birthday
              <input
                className="p-[6px] rounded-xl text-[#000]"
                type="date"
                name="birthday"
                value={birthday}
                onChange={handleChange}
                min={minValueForEmployeeBirthday}
                max={maxValueForEmployeeBirthday}
              />
            </label>

            <label className="flex flex-col gap-[2px] text-[#FFF]">
              Hire Date
              <input
                className="p-[6px] rounded-xl text-[#000]"
                type="date"
                name="hireDate"
                value={hireDate}
                onChange={handleChange}
                min={minValueForEmployeeHireDate}
                max={today}
              />
            </label>
          </div>

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
                Add Employee Avatar
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
          <Button buttonType={ButtonColorByType.DELETE}>
            <Link href={`/company/${companyId}`}>Cancel</Link>
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleCreateEmployee}
            isDisabled={isDisabled}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
