"use client";

import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { CompanyCard } from "@/components/CompanyCard/CompanyCard";
import { Loader } from "@/components/Loader";
import { useLazyGetAllCompaniesQuery } from "@/GlobalRedux/Features/company/companyApi";
import Link from "next/link";
import { Button } from "@/components/Button";
import { GoBackButton } from "@/components/GoBackButton";

export default function Company() {
  const [getCompanies, { data: companies, isLoading, isSuccess }] =
    useLazyGetAllCompaniesQuery();

  useEffect(() => {
    if (isSuccess) {
      const tiltElements: HTMLElement[] = document.querySelectorAll(
        ".company-card"
      ) as unknown as HTMLElement[];

      tiltElements.forEach((element) => {
        VanillaTilt.init(element, {
          max: 15,
          speed: 300,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          scale: 1.05,
        });
      });
    }
  }, [isSuccess, companies?.length]);

  useEffect(() => {
    getCompanies(null);
  }, [getCompanies]);

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap relative justify-between md:justify-normal items-center">
        <div className="md:absolute top-3 left-0">
          <GoBackButton />
        </div>

        <h1 className="flex-[1] text-[#FFF] text-center text-[30px] font-bold mt-[10px] md:mt-0 mb-[30px] order-1 md:order-none">
          Your Companies
        </h1>

        <Link
          href="/company/create"
          className="flex-end md:absolute right-0 top-0"
        >
          <Button>+ Create new</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid mx-[auto] gap-[30px] grid-cols-[repeat(1,_1fr)]  md:grid-cols-[repeat(3,_1fr)]">
          {companies?.map((company) => (
            <CompanyCard company={company} key={company.id} />
          ))}
        </div>
      )}

      {isSuccess && !companies?.length && (
        <h3 className="mt-[60px] text-center mb-4 text-3xl text-[#FFF]">
          You do not have any companies yet
        </h3>
      )}
    </div>
  );
}
