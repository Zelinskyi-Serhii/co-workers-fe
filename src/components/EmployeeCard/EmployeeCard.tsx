import { IEmployee } from "@/GlobalRedux/Features/employee/employeeApi";
import { convertDateToString } from "@/helpers/helperFunctions";
import Image from "next/image";
import { FC } from "react";
import "./EmployeeCard.scss";
import Link from "next/link";
import { Button } from "../Button";
import { ModalType, useModalContext } from "@/context/ModalContext";

type Props = {
  employee: IEmployee;
  isAdmin?: boolean;
};

export const EmployeeCard: FC<Props> = ({ employee, isAdmin }) => {
  const { setModal } = useModalContext();
  const {
    firstname,
    lastname,
    avatarUrl,
    position,
    birthday,
    hireDate,
    dismissed,
    id,
  } = employee;

  const handleDismissEmployee = () => {
    setModal({
      isOpen: true,
      modalType: ModalType.DISMISS_EMPLOYEE,
      employeeForDismiss: employee,
    });
  };

  return (
    <div className="card">
      <div className="content">
        {dismissed && (
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
              <span>Birthday:</span>{" "}
              <span>{convertDateToString(birthday)}</span>
            </p>

            <p>
              <span>Hired at:</span>
              <span>{convertDateToString(hireDate)}</span>
            </p>

            {dismissed && (
              <p>
                <span>Dismissed at:</span>
                <span>{convertDateToString(dismissed)}</span>
              </p>
            )}
          </div>

          <Link href={`/employee/${id}`} className="review">
            Look Reviews
          </Link>

          {isAdmin && !dismissed && (
            <div className="[&>button]:w-[100%] [&>button]:h-[36px] [&>button]:p-1 translate-z">
              <Button onClick={handleDismissEmployee}>Dismiss</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
