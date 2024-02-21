"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { useEffect, useMemo } from "react";
import * as employeeReducer from "@/GlobalRedux/Features/employee/employeeSlice";
import { EmployeeCard } from "@/components/EmployeeCard";
import Image from "next/image";
import { convertDateToMonthAndYear } from "@/helpers/helperFunctions";
import Link from "next/link";
import { PlusCircle } from "@/svgComponents/PlusCircle";

export default function CompanyDetails(props: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const id = props.params.id;
  const { company } = useAppSelector((state) => state.company);
  const { employees } = useAppSelector((state) => state.employee);

  const companyDetails = useMemo(
    () => company.find((company) => company.id === Number(id)),
    [company, id]
  );

  useEffect(() => {
    dispatch(employeeReducer.getEmployees(Number(id)));
  }, [dispatch, id]);

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
            <button className="bg-[#DC004E] hover-scale">Delete</button>
            <button className="flex items-center justify-center bg-[#1976d2] hover-scale">
              Update
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))] gap-4">
        <Link href="/employee/create" className="flex justify-center items-center border-4 border-[#B7BDBA] rounded-xl min-h-[300px] hover-scale cursor-pointer">
          <PlusCircle />
        </Link>

        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
