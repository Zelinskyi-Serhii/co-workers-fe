import { ICompany } from "@/GlobalRedux/Features/companySlice";
import { FC } from "react";

type Props = {
  company: ICompany;
};

export const CompanyCard: FC<Props> = ({ company }) => {
  const { name, avatarUrl, ownedAt, ownerName } = company;

  return (
    <div className="border-4 border-[#B7BDBA] rounded-xl h-[300px]">
      123
    </div>
  );
};
