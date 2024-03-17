"use client";

import { Loader } from "@/components/Loader";
import { useGetEmployeesQuery } from "@/GlobalRedux/Features/employee/employeeApi";
import { EmployeeCard } from "@/components/EmployeeCard/EmployeeCard";
import { useGetCompanyByIdQuery } from "@/GlobalRedux/Features/company/companyApi";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function CompanyDetails(props: { params: { id: string } }) {
  const id = props.params.id;
  const { data: company } = useGetCompanyByIdQuery({ companyId: id });
  const { data: employees, isLoading: isLoadingEmployee } =
    useGetEmployeesQuery({
      companyId: Number(id),
    });

  return (
    <div>
      <div className="relative flex w-[100%]">
        <h1 className="flex-[1] text-[#fff] font-bold text-[34px] text-center mb-[20px]">
          {company?.name}
        </h1>
        <div className="absolute right-0">
          <Button>
            <Link href={`/employee/create/?companyId=${id}`}>
              + Add new Employee
            </Link>
          </Button>
        </div>
      </div>

      {isLoadingEmployee ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4 mx-auto">
          <>
            {employees?.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </>
        </div>
      )}
    </div>
  );
}
