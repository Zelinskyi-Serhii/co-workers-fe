"use client";

import {
  useDeleteCompanyByIdMutation,
  useGetAllCompaniesQuery,
} from "@/GlobalRedux/Features/company/companyApi";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { ModalType, useModalContext } from "@/context/ModalContext";
import { convertDateToString } from "@/helpers/helperFunctions";
import { CopyIcon } from "@/svgComponents/CopyIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CompanySettingsPage() {
  const { setModal } = useModalContext();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const {
    data: companies,
    isLoading,
    isSuccess,
  } = useGetAllCompaniesQuery(null);

  const [
    deleteCompany,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteCompanyByIdMutation();

  const handleCopyLink = (publicLink: string) => {
    navigator.clipboard.writeText(publicLink);

    toast.success("Publick Url copies successfully");
  };

  const handleDeleteCompany = (companyId: string) => {
    setModal({
      isOpen: true,
      modalType: ModalType.CONFIRM,
      confirmState: {
        title: "Delete Company",
        desciprion: "Do you realy want to delete company permanently?",
        cancel: () => setModal({ isOpen: false, confirmState: null }),
        confirm: () => deleteCompany({ companyId }),
      },
    });
  };

  useEffect(() => {
    (async () => {
      if (deleteId) {
        await deleteCompany({ companyId: String(deleteId) });
        setDeleteId(null);
      }
    })();
  }, [deleteCompany, deleteId]);

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("Company deleted successfully");
    }

    if (isErrorDelete) {
      toast.error("Unable to delete company");
    }
  }, [isErrorDelete, isSuccessDelete]);

  return (
    <div className="text-white relative">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Company Settings
      </h1>
      <Link href="/company/create" className="flex-end absolute top-0 right-0">
        <Button>+ Create new</Button>
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
                      isLoading={company.id === deleteId}
                      onClick={() => handleDeleteCompany(String(company.id))}
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
          <div className="mt-[60px]">
            <h3 className="text-center mb-4">
              You dont have any companies yet
            </h3>
            <Link
              href="/company/create"
              className="flex justify-center overflow-hidden"
            >
              <Button>+ Create new</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
