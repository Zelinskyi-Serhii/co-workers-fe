"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { useEffect } from "react";
import * as companySlice from "@/GlobalRedux/Features/company/companySlice";
import VanillaTilt from "vanilla-tilt";
import "./page.scss";
import { CompanyCard } from "@/components/CompanyCard/CompanyCard";

export default function Company() {
  const dispatch = useAppDispatch();
  const { company, isLoading } = useAppSelector((state) => state.company);

  useEffect(() => {
    dispatch(companySlice.getAllCompanies());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      const tiltElements: HTMLElement[] = document.querySelectorAll(
        ".company-card"
      ) as unknown as HTMLElement[];

      console.log(123123, tiltElements);

      tiltElements.forEach((element) => {
        VanillaTilt.init(element, {
          max: 15,
          speed: 300,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          scale: 1.05,
        });
      });
    }, 2000);
  }, []);

  return (
    <div>
      <h1 className="text-[#FFF] text-center text-[30px] font-bold  mb-[30px] ">
        Your Companies
      </h1>
      <div className="company-list">
        {[...company, ...company].map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </div>
    </div>
  );
}
