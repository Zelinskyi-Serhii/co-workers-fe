"use client";

import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { useEffect, useRef } from "react";
import * as companySlice from "@/GlobalRedux/Features/company/companySlice";
import VanillaTilt from "vanilla-tilt";
import { CompanyCard } from "@/components/CompanyCard";
import { Loader } from "@/components/Loader";
import "./page.scss";
import Image from "next/image";

export default function Company() {
  const dispatch = useAppDispatch();
  const boxRefs = useRef<HTMLDivElement[]>([]);
  const { company, isLoading } = useAppSelector((state) => state.company);

  useEffect(() => {
    dispatch(companySlice.getAllCompanies());
  }, [dispatch]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))] gap-4">
      {/* {isLoading && (
        <div className="flex justify-center items-center border-4 border-[#B7BDBA] rounded-xl">
          <Loader />
        </div>
      )} */}

      <div className="company-list">
        {[...company, ...company].map((company) => (
          <div className="company-card" key={company.id}>
            <h2 className="name">Nike Air Max</h2>
            <a href="https://codepen.io/krautgti" className="buy">
              Buy Now
            </a>
            <div className="circle"></div>
            <Image
              width={200}
              height={200}
              className="product"
              src="https://assets.codepen.io/7773162/green.png"
              alt="Nike Air Max Green"
            />
          </div>
        ))}
      </div>

      {/* <CompanyCard key={company.id} company={company} /> */}
    </div>
  );
}
