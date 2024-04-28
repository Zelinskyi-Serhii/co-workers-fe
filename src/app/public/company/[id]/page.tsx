"use client";

import { useGetCompanyByPublicIdQuery } from "@/GlobalRedux/Features/company/companyApi";
import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import { EmployeeCard } from "@/components/EmployeeCard/EmployeeCard";
import { Loader } from "@/components/Loader";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function PublicEmployee(props: { params: { id: string } }) {
  const companyPublicId = props.params.id;
  const [filterByFullname, setFilterByFullname] = useState("");
  const [isHiddenDismissed, setIsHiddenDismissed] = useState(false);
  const debouncedFullname = useDebounce(filterByFullname, 500);
  const {
    data: company,
    isLoading,
    isSuccess,
    isError,
  } = useGetCompanyByPublicIdQuery(companyPublicId);

  const filteredEmployees = useMemo(() => {
    const employees: IEmployee[] = company?.employee || [];
    const debouncedFullnameLower = debouncedFullname.trim().toLocaleLowerCase();
    const [left, right] = debouncedFullnameLower.split(" ");

    let filtered = employees.filter((employee) => {
      const firstnameLower = employee.firstname.toLocaleLowerCase();
      const lastnameLower = employee.lastname.toLocaleLowerCase();

      const leftMatch =
        firstnameLower.includes(left) || lastnameLower.includes(left);

      if (right) {
        const rightMatch =
          firstnameLower.includes(right) || lastnameLower.includes(right);
        return leftMatch && rightMatch;
      }

      return leftMatch;
    });

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
    if (isError) {
      toast.error(
        "Unable to get employees for company. Maybe this url expired"
      );
    }
  }, [isError]);

  return (
    <div>
      <h1 className="flex-[1] text-[#fff] font-semibild text-[30px] text-center mb-[20px]">
        Employees in a <br className="md:hidden" />
        <span className="inline-block mx-1 font-bold text-3xl border-b-2 truncate max-w-[300px]">
          {company?.name}
        </span>{" "}
        company
      </h1>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          {isSuccess && Boolean(company?.employee?.length) && (
            <div className="flex flex-wrap md:flex-nowrap justify-between  gap-[20px] md:gap-[40px] items-end text-[#FFF] mb-6">
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
                  onChange={({ target }) =>
                    setIsHiddenDismissed(target.checked)
                  }
                />
                Hide Dismissed
              </label>

              <span>{`Total employees: ${company?.employee?.length}`}</span>

              <button
                className="border border-[#FFF] text-[#FFF] px-5 py-1 rounded-lg hover:bg-[#FFF] hover:text-[#000] transition-all md:ml-auto"
                onClick={handleClearFilterParams}
              >
                Clear Filters
              </button>
            </div>
          )}

          {isSuccess &&
            !filteredEmployees.length &&
            Boolean(company?.employee?.length) && (
              <h4 className="text-center text-[#FFF] font-semibold text-[24px]">
                You have not employees by search params
              </h4>
            )}

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4 mx-auto">
            <>
              {filteredEmployees.map((employee) => {
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
