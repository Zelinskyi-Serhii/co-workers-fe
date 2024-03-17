import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import {
  convertDateToMonthAndYear,
  getTotalYearsFromBirthDate,
} from "@/helpers/helperFunctions";
import Image from "next/image";
import { FC } from "react";
import "./EmployeeCard.scss";
import Link from "next/link";

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

  const fullnameLenght = firstname.length + lastname.length;

  return (
    <div className="card">
      <div className="content">
        {isDismissed && (
          <div className="marquee">
            <div className="flex">
              <p className="marquee__line">Dismissed</p>
              <p className="marquee__line">Dismissed</p>
            </div>
          </div>
        )}
        <div className="front">
          <Image
            src={avatarUrl}
            alt={firstname}
            width={100}
            height={300}
            className="img"
          />
          <h2 className="text-[30px]">{`${firstname} ${lastname}`}</h2>
        </div>
        <div className="back">
          <h2 className="text-[30px]">{`${firstname} ${lastname}`}</h2>
          <div className="back-content">
            <p>
              <span>Position:</span> <span>{position}</span>
            </p>
            <p>
              <span>Years:</span>{" "}
              <span>{getTotalYearsFromBirthDate(birthday)}</span>
            </p>
            <p>
              <span>Hired at:</span>
              <span>{convertDateToMonthAndYear(hireDate)}</span>
            </p>
          </div>

          <Link href={`/employee/${id}`} className="review">
            Look Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};
