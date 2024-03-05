"use client";

import Image from "next/image";
import { Loader } from "@/components/Loader";
import {
  convertDateToMonthAndYear,
  getTotalYearsFromBirthDate,
} from "@/helpers/helperFunctions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useDeleteEmployeeMutation,
  useDismissEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/GlobalRedux/Features/employee/employeeApi";

export default function EmployeeInfo(props: any) {
  const { id } = props.params;
  const router = useRouter();
  const [dismissEmployee, { isLoading: isLoadingDismiss }] =
    useDismissEmployeeMutation();
  const [deleteEmployee, { isLoading: isLoadingDelete }] =
    useDeleteEmployeeMutation();
  const { data: employee } = useGetEmployeeByIdQuery({
    employeeId: id,
  });

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee({ employeeId: id });
      toast.success("Employee deleted successfully");
      router.push("/company");
    } catch (error) {
      toast.error("Unable to delete employee");
    }
  };

  const handleDismissEmployee = async () => {
    try {
      await dismissEmployee({ employeeId: id });
      toast.success("Employee updated successfully");
    } catch (error) {}
    toast.error("Unable to update employee");
  };

  return (
    <div>
      {employee && (
        <div className="relative flex items-center mx-auto mb-8 gap-20 w-fit border border-[#ada5a5] rounded-xl p-10">
          {employee.isDismissed && (
            <div className="marquee rounded-t-xl">
              <div className="flex">
                <p className="marquee__line">Dismissed</p>
                <p className="marquee__line">Dismissed</p>
              </div>
            </div>
          )}
          <Image
            className=" rounded-xl"
            src={employee.avatarUrl || ""}
            height={200}
            width={200}
            alt="Company"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              {employee.firstname} {employee.lastname}
            </h2>
            <p className="text-xl font-medium">{employee.position}</p>
            <p className="text-l font-light">
              <span className="font-thin text-[#b4b3b3]">Hired:</span>{" "}
              {convertDateToMonthAndYear(employee.hireDate)}
            </p>
            <p className="text-l font-light">
              {getTotalYearsFromBirthDate(employee.birthday)} years
            </p>
          </div>

          <div className="flex flex-col gap-4 [&>button]:p-4 [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
            <button
              onClick={handleDeleteEmployee}
              className="flex justify-center items-center bg-[#DC004E] hover-scale"
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? <Loader /> : "Delete"}
            </button>
            <button
              className="flex items-center justify-center bg-[#1976d2] hover-scale"
              onClick={handleDismissEmployee}
              disabled={isLoadingDismiss || employee.isDismissed}
            >
              {isLoadingDismiss ? <Loader /> : "Dismiss"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
