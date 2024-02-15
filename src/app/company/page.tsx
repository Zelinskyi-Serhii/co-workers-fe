"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { useEffect } from "react";
import * as companySlice from "@/GlobalRedux/Features/companySlice";
import { CompanyCard } from "@/components/CompanyCard";
import Image from "next/image";
import plus_circle from "@/assets/svg/plus-circle.svg";

export default function Company() {
  const dispatch = useAppDispatch();
  const { company, loading, error } = useAppSelector((state) => state.company);

  useEffect(() => {
    dispatch(companySlice.getAllCompanies());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4">
      <div className="border-4 border-[#B7BDBA] rounded-xl max-w-[400px] h-[300px]">
        <Image src={plus_circle} width={50} height={50} alt="Plus" />
      </div>
      {company.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
