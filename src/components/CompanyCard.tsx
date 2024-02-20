import { ICompany } from "@/GlobalRedux/Features/companySlice";
import { convertDateToMonthAndYear } from "@/helpers/helperFunctions";
import { DeleteIcon } from "@/svgComponents/DeleteIcon";
import { EditIcon } from "@/svgComponents/EditIcon";
import Image from "next/image";
import { FC } from "react";

type Props = {
  company: ICompany;
};

export const CompanyCard: FC<Props> = ({ company }) => {
  const { name, avatarUrl, ownedAt, ownerName } = company;

  return (
    <div className="relative flex flex-col justify-between border-4 border-[#B7BDBA] rounded-xl min-h-[360px] px-4 py-4 hover-scale cursor-pointer">
      <div className="absolute right-2 top-2 flex [&>svg]:w-8 [&>svg]:h-8 [&>svg]:p-1 [&>svg]:transition-[0.3s] [&>svg]:rounded-xl [&>svg:hover]:bg-[#B7BDBA]">
        <DeleteIcon />
        <EditIcon />
      </div>

      <Image
        src={avatarUrl}
        width={200}
        height={200}
        alt={name}
        className="mx-auto rounded-xl"
      />

      <div>
        <h3 className="text-center text-2xl font-bold mt-4">{name}</h3>
        <p className="text-center text-lg mt-2">{ownerName}</p>
        <p className="text-center text-lg mt-2">
          {convertDateToMonthAndYear(ownedAt)}
        </p>
      </div>
    </div>
  );
};
