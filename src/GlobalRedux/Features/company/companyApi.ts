import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IEmployee } from "../employee/employeeApi";
import { IReview } from "../review/reviewApi";
interface IEmployeeWithReview extends IEmployee {
  review: IReview[];
}

export interface ICompany {
  id: number;
  name: string;
  avatarUrl: string;
  ownedAt: Date;
  ownerName: string;
  publicId?: string;
}

interface IPublicCompany {
  id: number;
  name: string;
  avatarUrl: string;
  ownedAt: Date;
  ownerName: string;
  employee: IEmployee[];
}

interface ICompanyWithReviewsResponse extends ICompany {
  employee: IEmployeeWithReview[];
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
    getCompanyAndEmployees: builder.query<
      IPublicCompany,
      { companyId: string }
    >({
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
    getCompanyByPublicId: builder.query<IPublicCompany, string>({
      query: (publickId) => {
        return { url: `/company/getByPublicId/${publickId}` };
      },
    }),
    getReviewByPublicId: builder.query<
      ICompanyWithReviewsResponse,
      { companyId: string; employeeId: string }
    >({
      query: ({ companyId, employeeId }) => {
        return { url: `/company/getReviews/${companyId}/${employeeId}` };
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
  useGetCompanyByPublicIdQuery,
  useGetReviewByPublicIdQuery,
  useLazyGetCompanyAndEmployeesQuery,
} = companyApi;
