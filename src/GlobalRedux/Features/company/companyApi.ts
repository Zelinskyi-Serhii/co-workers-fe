import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface ICompany {
  id: number;
  name: string;
  avatarUrl: string;
  ownedAt: Date;
  ownerName: string;
}

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllCompanies: builder.query<ICompany[], unknown>({
      query: () => {
        return { url: "/company/getAll" };
      },
    }),
    getCompanyById: builder.query<ICompany, { companyId: string }>({
      query: ({ companyId }) => {
        return { url: `/company/${companyId}` };
      },
    }),
    deleteCompanyById: builder.query<unknown, { companyId: string }>({
      query: ({ companyId }) => {
        return { url: `/company/delete/${companyId}`, method: "DELETE" };
      },
    }),
    createNewCompany: builder.mutation<ICompany, FormData>({
      query: (newCompany: FormData) => {
        return {
          url: "/company/create",
          method: "POST",
          data: newCompany,
          header: { "Content-Type": "multipart/form-data" },
        };
      },
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useLazyGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateNewCompanyMutation,
} = companyApi;
