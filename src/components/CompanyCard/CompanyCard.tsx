import { convertDateToMonthAndYear } from "@/helpers/helperFunctions";
import Image from "next/image";
import { FC } from "react";

import "./CompanyCard.scss";
import Link from "next/link";
import { ICompany } from "@/GlobalRedux/Features/company/companyApi";

type Props = {
  company: ICompany;
};

export const CompanyCard: FC<Props> = ({ company }) => {
  const { name, avatarUrl, ownedAt, ownerName, id } = company;

  return (
    <div
      className="company-card relative h-[370px] w-[370px] bg-[#232323] rounded-[20px] transform-preserve"
      key={company.id}
      data-before={ownerName}
      data-after={convertDateToMonthAndYear(ownedAt)}
    >
      <h2 className="company-card__name transform-preserve absolute top-0 left-0 text-center text-[#f8f8f8] w-full truncate max-w-[200px]">
        {name}
      </h2>

      <Link href={`/company/${id}`} className="company-card__button">
        Employees
      </Link>

      <div className="company-card__circle">
        <span className="truncate max-w-[180px]">{name}</span>
      </div>

      <Image
        width={150}
        height={150}
        className="company-card__product"
        src={avatarUrl}
        alt={name}
      />
    </div>
  );
};
