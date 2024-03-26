import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface ICompany {
  id: number;
  name: string;
  avatarUrl: string;
  ownedAt: Date;
  ownerName: string;
  publickId: string | null;
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
    deleteCompanyById: builder.mutation<unknown, { companyId: string }>({
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
    updateCompany: builder.mutation<
      unknown,
      { newCompany: FormData; companyId: number }
    >({
      query: ({ newCompany, companyId }) => {
        return {
          url: `/company/update/${companyId}`,
          method: "PUT",
          data: newCompany,
          header: { "Content-Type": "multipart/form-data" },
        };
      },
    }),
    generatePublickId: builder.mutation<unknown, number>({
      query: (companyId) => {
        return { url: `/company/generateId/${companyId}` };
      },
    }),
    getCompanyByPublickId: builder.query<ICompany, string>({
      query: (publickId) => {
        return { url: `/company/getAll/${publickId}` };
      },
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useLazyGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateNewCompanyMutation,
  useDeleteCompanyByIdMutation,
  useUpdateCompanyMutation,
  useGeneratePublickIdMutation,
  useGetCompanyByPublickIdQuery,
} = companyApi;
