"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, Suspense, useEffect } from "react";
import { Loader } from "@/components/Loader";
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
import { useForm } from "react-hook-form";
import { createEmployeeValidationSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@/components/TextField";

type FormValues = {
  firstname: string;
  lastname: string;
  position: string;
  hireDate: string;
  birthday: string;
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
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEmployeeValidationSchema),
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

  const handleCreateEmployee = async (values: FormValues) => {
    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    const formData = new FormData();

    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("position", values.position);
    formData.append("companyId", companyId as string);
    formData.append("hireDate", new Date(values.hireDate).toISOString());
    formData.append("birthday", new Date(values.birthday).toISOString());
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
    <div className="max-w-[500px] mx-auto bg-[#232323] border rounded-xl overflow-hidden">
      <h2 className="flex justify-center gap-2 bg-[#1976d2] p-[10px] text-[#FFF] text-center text-lg font-semibold">
        New Employee for
        <span className="block truncate max-w-[200px]">{company?.name}</span>
      </h2>

      <form
        className="flex flex-col gap-[10px] justify-between p-[20px]"
        onSubmit={handleSubmit(handleCreateEmployee)}
      >
        <div className="flex flex-col gap-[15px] [&>label]:text-[#999999]">
          <TextField
            title={"First Name"}
            {...register("firstname")}
            helpText={errors.firstname?.message}
            style={{ color: "#000" }}
          />

          <TextField
            title={"Last Name"}
            {...register("lastname")}
            helpText={errors.lastname?.message}
            style={{ color: "#000" }}
          />

          <TextField
            title={"Job Position"}
            {...register("position")}
            helpText={errors.position?.message}
            style={{ color: "#000" }}
          />

          <div className="flex justify-between gap-[20px] [&>label]:text-[#999999] [&>label]:flex-[1]">
            <TextField
              title={"Birthday"}
              {...register("birthday")}
              helpText={errors.birthday?.message}
              style={{ color: "#000" }}
              min={minValueForEmployeeBirthday}
              max={maxValueForEmployeeBirthday}
              type="date"
            />

            <TextField
              title={"Hire Date"}
              {...register("hireDate")}
              helpText={errors.hireDate?.message}
              style={{ color: "#000" }}
              min={minValueForEmployeeHireDate}
              max={today}
              type="date"
            />
          </div>

          <Image
            className="mx-auto max-w-[150px] max-h-[150px] aspect-auto"
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
          <Button isLoading={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
