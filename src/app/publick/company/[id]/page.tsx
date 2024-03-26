"use client";

import { useGetCompanyByPublickIdQuery } from "@/GlobalRedux/Features/company/companyApi";

export default function PublickEmployee(props: { params: { id: string } }) {
  const {
    data: company,
    isLoading,
    isSuccess,
    isError,
  } = useGetCompanyByPublickIdQuery(props.params.id);

  console.log(company);

  return (
    <section className="text-[#FFF]">
      Publick Company page {props.params.id}
    </section>
  );
}
