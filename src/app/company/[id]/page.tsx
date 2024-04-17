"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader } from "@/components/Loader";
import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import { EmployeeCard } from "@/components/EmployeeCard/EmployeeCard";
import { useLazyGetCompanyAndEmployeesQuery } from "@/GlobalRedux/Features/company/companyApi";
import { Button } from "@/components/Button";
import Link from "next/link";
import { GoBackButton } from "@/components/GoBackButton";
import { useDebounce } from "@/hooks/useDebounce";

export default function CompanyDetails(props: { params: { id: string } }) {
  const id = props.params.id;
  const [getEmployees, { data: company, isLoading, isSuccess }] =
    useLazyGetCompanyAndEmployeesQuery();
  const [filterByFullname, setFilterByFullname] = useState("");
  const [isHiddenDismissed, setIsHiddenDismissed] = useState(false);
  const debouncedFullname = useDebounce(filterByFullname, 500);

  const filteredEmployees = useMemo(() => {
    const employees: IEmployee[] = company?.employee || [];

    let filtered = [...employees].filter(
      (employee) =>
        employee.firstname.includes(debouncedFullname.trim()) ||
        employee.lastname.includes(debouncedFullname.trim())
    );

    if (isHiddenDismissed) {
      filtered = filtered.filter((employee) => !employee.dismissed);
    }

    return filtered;
  }, [company?.employee, debouncedFullname, isHiddenDismissed]);

  const handleClearFilterParams = () => {
    setFilterByFullname("");
    setIsHiddenDismissed(false);
  };

  useEffect(() => {
    getEmployees({ companyId: id });
  }, [getEmployees, id]);

  return (
    <div>
      <div className="relative flex w-[100%]">
        <GoBackButton className="absolute h-fit top-[10px]" />

        {company && (
          <h1 className="flex-[1] text-[#fff] font-semibild text-[30px] text-center mb-[20px]">
            Employees in a{" "}
            <span className="font-bold text-3xl border-b-2">
              {company?.name}
            </span>{" "}
            company
          </h1>
        )}

        <div className="absolute right-0">
          <Button>
            <Link href={`/employee/create/?companyId=${id}`}>
              + Add new Employee
            </Link>
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {isSuccess && Boolean(company?.employee?.length) && (
        <div className="flex gap-[40px] items-end text-[#FFF] mb-6">
          <label className="flex flex-col">
            Filter by Fullname
            <input
              type="text"
              placeholder="search"
              value={filterByFullname}
              onChange={({ target }) => setFilterByFullname(target.value)}
              className="text-[#000] outline-none px-2 py-1 rounded-sm"
            />
          </label>

          <label className="flex gap-1">
            <input
              type="checkbox"
              className="h-5 w-5 flex"
              checked={isHiddenDismissed}
              onChange={({ target }) => setIsHiddenDismissed(target.checked)}
            />
            Hide Dismissed
          </label>

          <button
            className="border border-[#FFF] text-[#FFF] px-5 py-1 rounded-lg hover:bg-[#FFF] hover:text-[#000] transition-all ml-auto"
            onClick={handleClearFilterParams}
          >
            Clear Filters
          </button>
        </div>
      )}

      {isSuccess && Boolean(filteredEmployees?.length) && (
        <div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4 mx-auto">
            {filteredEmployees?.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                isAdmin
                refetch={() => getEmployees({ companyId: id })}
              />
            ))}
          </div>
        </div>
      )}

      {isSuccess &&
        !filteredEmployees.length &&
        Boolean(company.employee.length) && (
          <h4 className="text-center text-[#FFF] font-semibold text-[24px]">
            You have not employees by search params
          </h4>
        )}

      {isSuccess && !company?.employee?.length && company && (
        <h3 className="mt-[60px] text-center mb-4 text-3xl text-[#FFF]">
          You do not have any employees yet
        </h3>
      )}

      {isSuccess && !company && (
        <>
          <h2 className="text-[#FFF] text-center text-3xl mb-4">
            Oooops, seems it is not your company.
          </h2>
          <Link href="/company" className="flex justify-center">
            <Button>Go Back</Button>
          </Link>
        </>
      )}
    </div>
  );
}
