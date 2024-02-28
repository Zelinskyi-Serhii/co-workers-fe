"use client";

import { useMemo } from "react";
import Image from "next/image";
import * as employeeSlice from "@/GlobalRedux/Features/employee/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { Loader } from "@/components/Loader";
import {
  convertDateToMonthAndYear,
  getTotalYearsFromBirthDate,
} from "@/helpers/helperFunctions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EmployeeInfo(props: any) {
  const { id } = props.params;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employees, isLoading } = useAppSelector((state) => state.employee);

  const employeeDetails = useMemo(
    () => employees.find((employee) => employee.id === Number(id)),
    [employees, id]
  );

  const handleDeleteEmployee = async () => {
    const response = await dispatch(employeeSlice.deleteEmployee(id));

    if (response.payload) {
      toast.success("Employee delete successfully");
      router.push("/company");
    } else {
      toast.error("Unable to delete employee");
    }
  };

  const handleDismissEmployee = async () => {
    if (employeeDetails?.isDismissed) {
      toast.error('Employee already dismissed')
      return;
    }

    // todo: fix fresh reload
    const response = await dispatch(employeeSlice.dismissEmployee(id));

    if (response.payload) {
      toast.success("Employee updated successfully");
    } else {
      toast.error("Unable to update employee");
    }
  };

  return (
    <div>
      {employeeDetails && (
        <div className="relative flex items-center mx-auto mb-8 gap-20 w-fit border border-[#ada5a5] rounded-xl p-10">
          {employeeDetails.isDismissed && (
            <div className="marquee rounded-t-xl">
              <div className="flex">
                <p className="marquee__line">Dismissed</p>
                <p className="marquee__line">Dismissed</p>
              </div>
            </div>
          )}
          <Image
            className=" rounded-xl"
            src={employeeDetails.avatarUrl || ""}
            height={200}
            width={200}
            alt="Company"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              {employeeDetails.firstname} {employeeDetails.lastname}
            </h2>
            <p className="text-xl font-medium">{employeeDetails.position}</p>
            <p className="text-l font-light">
              <span className="font-thin text-[#b4b3b3]">Hired:</span>{" "}
              {convertDateToMonthAndYear(employeeDetails.hireDate)}
            </p>
            <p className="text-l font-light">
              {getTotalYearsFromBirthDate(employeeDetails.birthday)} years
            </p>
          </div>

          <div className="flex flex-col gap-4 [&>button]:p-4 [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
            <button
              onClick={handleDeleteEmployee}
              className="flex justify-center items-center bg-[#DC004E] hover-scale"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Delete"}
            </button>
            <button
              className="flex items-center justify-center bg-[#1976d2] hover-scale"
              onClick={handleDismissEmployee}
              disabled={isLoading || employeeDetails.isDismissed}
            >
              {isLoading ? <Loader /> : "Dismiss"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
