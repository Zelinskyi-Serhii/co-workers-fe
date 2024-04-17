import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface IEmployee {
  id: string;
  companyId: number;
  firstname: string;
  lastname: string;
  position: string;
  hireDate: Date;
  avatarUrl: string;
  birthday: Date;
  dismissed: Date | null;
}

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getEmployees: builder.query<IEmployee[], { companyId: number }>({
      query: ({ companyId }) => {
        return { url: `/employee/getAll/${companyId}` };
      },
    }),
    getEmployeeById: builder.query<IEmployee, { employeeId: string }>({
      query: ({ employeeId }) => {
        return { url: `/employee/getOne/${employeeId}` };
      },
    }),
    getEmployeeBySearch: builder.query<IEmployee[], string>({
      query: (searchParams) => {
        return { url: `/employee/search/${searchParams}` };
      },
    }),
    createEmployee: builder.mutation<IEmployee, FormData>({
      query: (newEmployee: FormData) => {
        return {
          url: "/employee/create",
          method: "POST",
          data: newEmployee,
          header: { "Content-Type": "multipart/form-data" },
        };
      },
    }),
    deleteEmployee: builder.mutation<
      { message: string },
      { employeeId: string }
    >({
      query: ({ employeeId }) => {
        return { url: `/employee/delete/${employeeId}`, method: "DELETE" };
      },
    }),
    dismissEmployee: builder.mutation<
      { message: string },
      { employeeId: string; dismissed: string }
    >({
      query: ({ employeeId, dismissed }) => {
        return {
          url: `/employee/dismiss/${employeeId}`,
          method: "PUT",
          data: { dismissed },
        };
      },
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useDeleteEmployeeMutation,
  useDismissEmployeeMutation,
  useCreateEmployeeMutation,
  useLazyGetEmployeeBySearchQuery,
} = employeeApi;
