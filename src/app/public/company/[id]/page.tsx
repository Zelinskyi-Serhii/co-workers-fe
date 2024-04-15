"use client";

import { useGetCompanyByPublicIdQuery } from "@/GlobalRedux/Features/company/companyApi";
import { EmployeeCard } from "@/components/EmployeeCard/EmployeeCard";
import { Loader } from "@/components/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PublicEmployee(props: { params: { id: string } }) {
  const companyPublicId = props.params.id;
  const {
    data: company,
    isLoading,
    isSuccess,
    isError,
  } = useGetCompanyByPublicIdQuery(companyPublicId);

  useEffect(() => {
    if (isError) {
      toast.error(
        "Unable to get employees for company. Maybe this url expired"
      );
    }
  }, [isError]);

  return (
    <div>
      <h1 className="flex-[1] text-[#fff] font-semibild text-[30px] text-center mb-[20px]">
        Employees in a{" "}
        <span className="font-bold text-3xl border-b-2">{company?.name}</span>{" "}
        company
      </h1>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4 mx-auto">
          <>
            {company?.employee?.map((employee) => {
              const linkTo = `/public/employee?companyId=${companyPublicId}&employeeId=${employee.id}`;
              return (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  linkTo={linkTo}
                />
              );
            })}
          </>
        </div>
      )}

      {isSuccess && !company?.employee?.length && (
        <h3 className="mt-[60px] text-center mb-4 text-3xl text-[#FFF]">
          This Company do not have any employees yet
        </h3>
      )}
    </div>
  );
}
