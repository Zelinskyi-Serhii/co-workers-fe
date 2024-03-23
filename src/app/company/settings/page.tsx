"use client";

import {
  ICompany,
  useGetAllCompaniesQuery,
} from "@/GlobalRedux/Features/company/companyApi";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { convertDateToString } from "@/helpers/helperFunctions";
import { CopyIcon } from "@/svgComponents/CopyIcon";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function CompanySettingsPage() {
  const { setModal } = useModalContext();
  const {
    data: companies,
    isLoading,
    isSuccess,
  } = useGetAllCompaniesQuery(null);

  const handleCopyLink = (publicLink: string) => {
    navigator.clipboard.writeText(publicLink);

    toast.success("Publick Url copies successfully");
  };

  const handleDeleteCompany = (company: ICompany) => {
    setModal({
      isOpen: true,
      modalType: ModalType.DELETE_COMPANY,
      companyForDelete: company,
    });
  };

  return (
    <div className="text-white relative">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Company Settings
      </h1>
      <Link href="/company/create" className="flex-end absolute top-0 right-0">
        <Button>+ Create new Company</Button>
      </Link>
      <div className="overflow-x-auto">
        {isLoading && (
          <div className="flex justify-center h-[100px]">
            <Loader />
          </div>
        )}

        {isSuccess && Boolean(companies.length) && (
          <table className="min-w-full border border-gray-800">
            <thead className="bg-gray-900">
              <tr className="[&>th]:text-start">
                <th className="px-4 py-2">Logo</th>
                <th className="px-4 py-2">Brand Name</th>
                <th className="px-4 py-2">Owner Name</th>
                <th className="px-4 py-2">Since</th>
                <th className="px-4 py-2">Public Link</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={company.id}
                  className={`bg-gray-800 ${
                    index !== companies.length - 1
                      ? "border-b border-gray-700"
                      : ""
                  }`}
                >
                  <td className="px-4 py-2">
                    <div className="w-12 h-12 overflow-hidden flex items-center">
                      <Image
                        width={100}
                        height={100}
                        src={company.avatarUrl}
                        alt={company.name}
                        className="my-auto"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">{company.name}</td>
                  <td className="px-4 py-2">{company.ownerName}</td>
                  <td className="px-4 py-2">
                    {convertDateToString(company.ownedAt)}
                  </td>
                  <td
                    className="flex items-center gap-2 h-[64px] px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all duration-300"
                    onClick={() => handleCopyLink("srgsrgrdgrd")}
                  >
                    weufiuehwirghuierug
                    <CopyIcon />
                  </td>
                  <td className="px-4 py-2 [&>button]:inline">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2  w-[90px]">
                      Update
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded w-[90px]"
                      onClick={() => handleDeleteCompany(company)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isSuccess && !companies.length && (
          <h3 className="mt-[60px] text-center mb-4 text-3xl">
            You dont have any companies yet
          </h3>
        )}
      </div>
    </div>
  );
}
