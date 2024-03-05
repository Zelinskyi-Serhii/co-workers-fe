"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { useEffect } from "react";
import * as companySlice from "@/GlobalRedux/Features/company/companySlice";
import { CompanyCard } from "@/components/CompanyCard";
import { PlusCircle } from "@/svgComponents/PlusCircle";
import { Loader } from "@/components/Loader";
import Link from "next/link";

export default function Company() {
  const dispatch = useAppDispatch();
  const { company, isLoading, error } = useAppSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(companySlice.getAllCompanies());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))] gap-4">
      <Link
        href="/company/create"
        className="flex justify-center items-center border-4 border-[#B7BDBA] rounded-xl min-h-[300px] hover-scale cursor-pointer"
      >
        <PlusCircle />
      </Link>

      {isLoading && (
        <div className="flex justify-center items-center border-4 border-[#B7BDBA] rounded-xl">
          <Loader />
        </div>
      )}

      {company.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
