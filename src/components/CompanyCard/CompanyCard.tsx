import { ICompany } from "@/GlobalRedux/Features/company/companySlice";
import { convertDateToMonthAndYear } from "@/helpers/helperFunctions";
import Image from "next/image";
import { FC } from "react";

import "./CompanyCard.scss";

type Props = {
  company: ICompany;
};

export const CompanyCard: FC<Props> = ({ company }) => {
  const { name, avatarUrl, ownedAt, ownerName, id } = company;

  return (
    <div
      className="company-card"
      key={company.id}
      data-before={ownerName}
      data-after={convertDateToMonthAndYear(ownedAt)}
    >
      <h2 className="company-card__name">{name}</h2>

      <a href="https://codepen.io/krautgti" className="company-card__buy">
        Employees
      </a>

      <div className="company-card__circle">{name}</div>

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
