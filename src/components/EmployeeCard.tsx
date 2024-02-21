import { IEmployee } from "@/GlobalRedux/Features/employee/employeeSlice";
import {
  convertDateToMonthAndYear,
  getTotalYearsFromBirthDate,
} from "@/helpers/helperFunctions";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  employee: IEmployee;
};

export const EmployeeCard: FC<Props> = ({ employee }) => {
  const {
    firstname,
    lastname,
    avatarUrl,
    position,
    birthday,
    hireDate,
    isDismissed,
    id,
  } = employee;

  return (
    <Link
      href={`/employee/${id}`}
      className="relative flex flex-col gap-3 items-center border-4 border-[#B7BDBA] rounded-xl min-h-[300px] p-4 hover-scale cursor-pointer"
    >
      <Image
        src={avatarUrl}
        height={200}
        width={200}
        alt={firstname}
        className="mx-auto rounded-xl"
      />

      <h3 className="flex gap-2 text-xl font-semibold">
        <span>{firstname}</span>
        <span>{lastname}</span>
      </h3>

      <p className="font-medium text-l">{position}</p>
      <p>{getTotalYearsFromBirthDate(birthday)} years</p>
      <p>
        <span className="font-extralight text-[#b4b3b3]">Hired: </span>
        {convertDateToMonthAndYear(hireDate)}
      </p>

      {isDismissed && (
        <div className="marquee rounded-t-xl">
          <div className="flex">
            <p className="marquee__line">Dismissed</p>
            <p className="marquee__line">Dismissed</p>
          </div>
        </div>
      )}
    </Link>
  );
};
