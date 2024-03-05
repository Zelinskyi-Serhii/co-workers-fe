"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { useMemo } from "react";
import * as companyReducer from "@/GlobalRedux/Features/company/companySlice";
import { EmployeeCard } from "@/components/EmployeeCard";
import Image from "next/image";
import { convertDateToMonthAndYear } from "@/helpers/helperFunctions";
import Link from "next/link";
import { PlusCircle } from "@/svgComponents/PlusCircle";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { useGetEmployeesQuery } from "@/GlobalRedux/Features/employee/employeeApi";

export default function CompanyDetails(props: { params: { id: string } }) {
  const id = props.params.id;
  const dispatch = useAppDispatch();
  const { company, isLoading: isLoadingCompany } = useAppSelector(
    (state) => state.company
  );
  const router = useRouter();
  const companyDetails = useMemo(
    () => company.find((company) => company.id === Number(id)),
    [company, id]
  );

  const { data: employees, isLoading: isLoadingEmployee } =
    useGetEmployeesQuery({
      companyId: Number(id),
    });

  const handleDeleteCompany = async () => {
    const response = await dispatch(companyReducer.deleteCompany(Number(id)));

    if (response.payload) {
      toast.success("Company deleted successfully");
      router.push("/company");
    }
  };

  return (
    <div>
      {companyDetails && (
        <div className="flex items-center mx-auto mb-8 gap-20 w-fit border border-[#ada5a5] rounded-xl p-10">
          <Image
            className=" rounded-xl"
            src={companyDetails.avatarUrl || ""}
            height={200}
            width={200}
            alt="Company"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              <span className="font-thin text-[#b4b3b3]">Brand:</span>{" "}
              {companyDetails.name}
            </h2>
            <p className="text-xl font-medium">
              <span className="font-thin text-[#b4b3b3]">Owner:</span>{" "}
              {companyDetails.ownerName}
            </p>
            <p className="text-l font-light">
              <span className="font-thin text-[#b4b3b3]">Since:</span>{" "}
              {convertDateToMonthAndYear(companyDetails.ownedAt)}
            </p>
          </div>

          <div className="flex flex-col gap-4 [&>button]:p-4 [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
            <button
              onClick={handleDeleteCompany}
              className="flex justify-center items-center bg-[#DC004E] hover-scale"
              disabled={isLoadingCompany}
            >
              {isLoadingCompany ? <Loader /> : "Delete"}
            </button>
            <button className="flex items-center justify-center bg-[#1976d2] hover-scale">
              Update
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))] gap-4">
        <Link
          href={`/employee/create/?companyId=${id}`}
          className="flex justify-center items-center border-4 border-[#B7BDBA] rounded-xl min-h-[300px] hover-scale cursor-pointer"
        >
          <PlusCircle />
        </Link>

        {isLoadingEmployee ? (
          <div className="flex justify-center items-center border-4 border-[#B7BDBA] rounded-xl min-h-[300px]">
            <Loader />
          </div>
        ) : (
          <>
            {employees?.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
