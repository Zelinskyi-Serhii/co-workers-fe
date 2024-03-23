import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface IEmployee {
  id: number;
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
    getEmployeeById: builder.query<IEmployee, { employeeId: number }>({
      query: ({ employeeId }) => {
        return { url: `/employee/getOne/${employeeId}` };
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
      { employeeId: number }
    >({
      query: ({ employeeId }) => {
        return { url: `/employee/delete/${employeeId}`, method: "DELETE" };
      },
    }),
    dismissEmployee: builder.mutation<
      { message: string },
      { employeeId: number; dismissed: string }
    >({
      query: ({ employeeId, dismissed }) => {
        console.log(dismissed);

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
} = employeeApi;
