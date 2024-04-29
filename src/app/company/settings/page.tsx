"use client";

import {
  ICompany,
  useGeneratePublicIdMutation,
  useGetAllCompaniesQuery,
} from "@/GlobalRedux/Features/company/companyApi";
import { Button } from "@/components/Button";
import { GoBackButton } from "@/components/GoBackButton";
import { Loader } from "@/components/Loader";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { convertDateToString } from "@/helpers/helperFunctions";
import { CopyIcon } from "@/svgComponents/CopyIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

export default function CompanySettingsPage() {
  const { setModal } = useModalContext();
  const [isLoadingId, setIsLoadingId] = useState<number | null>(null);
  const {
    data: companies,
    refetch,
    isLoading,
    isSuccess,
  } = useGetAllCompaniesQuery(null);
  const [
    generatePublicId,
    { isSuccess: isSuccessGenerate, isError: isErrorGenerate },
  ] = useGeneratePublicIdMutation();

  const handleCopyLink = (publicLink: string) => {
    navigator.clipboard.writeText(publicLink);

    toast.success("Public Url copies successfully");
  };

  const handleDeleteCompany = (company: ICompany) => {
    setModal({
      isOpen: true,
      modalType: ModalType.DELETE_COMPANY,
      companyForDelete: company,
      closeModalCallback: refetch,
    });
  };

  const handleUpdateCompany = (company: ICompany) => {
    setModal({
      isOpen: true,
      companyForUpdate: company,
      modalType: ModalType.UPDATE_COMPANY,
      closeModalCallback: refetch,
    });
  };

  useEffect(() => {
    if (isSuccessGenerate) {
      toast.success("Public Link generated successfully");
      setIsLoadingId(null);
      refetch();
    }

    if (isErrorGenerate) {
      toast.error("Unable to generate public link");
      setIsLoadingId(null);
    }
  }, [isErrorGenerate, isSuccessGenerate, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="text-white relative">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
        <div className="md:absolute top-3 left-0">
          <GoBackButton href="/company" />
        </div>

        <h1 className="text-3xl font-semibold text-center mb-6 md:order-none order-1 w-full mt-[20px] md:mt-0">
          Company Settings
        </h1>

        <Link
          href="/company/create"
          className="flex-end md:absolute top-0 right-0"
        >
          <Button>+ Create new Company</Button>
        </Link>
      </div>

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
              {companies?.map((company, index) => (
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
                  <td className="px-4 py-2  truncate max-w-[200px]">
                    {company.name}
                  </td>
                  <td className="px-4 py-2  truncate max-w-[200px]">
                    {company.ownerName}
                  </td>
                  <td className="px-4 py-2">
                    {convertDateToString(company.ownedAt)}
                  </td>

                  {company.publicId ? (
                    <td
                      className="flex items-center w-[250px] overflow-x-auto gap-2 h-[64px] px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all duration-300 text-nowrap"
                      onClick={() =>
                        handleCopyLink(
                          `${DOMAIN}/public/company/${company.publicId}`
                        )
                      }
                    >
                      <CopyIcon />
                      {`${DOMAIN}/public/company/${company.publicId}`}
                    </td>
                  ) : (
                    <td>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
                        onClick={() => {
                          setIsLoadingId(Number(company.id));
                          generatePublicId(Number(company.id));
                        }}
                        isLoading={isLoadingId === Number(company.id)}
                      >
                        Generate public link
                      </Button>
                    </td>
                  )}

                  <td className="px-4 py-2 [&>button]:inline [&>button]:w-fit">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2 w-[90px] mb-[4px] md:mb-0"
                      onClick={() => handleUpdateCompany(company)}
                    >
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
