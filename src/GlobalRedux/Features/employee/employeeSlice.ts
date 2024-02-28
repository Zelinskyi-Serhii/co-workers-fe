import { axiosInstance } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IEmployee {
  id: number;
  companyId: number;
  firstname: string;
  lastname: string;
  position: string;
  hireDate: Date;
  avatarUrl: string;
  birthday: Date;
  isDismissed: boolean;
}

interface IEmployeeState {
  employees: IEmployee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IEmployeeState = {
  employees: [],
  isLoading: false,
  error: null,
};

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (companyId: number) => {
    const response = await axiosInstance.get(`/employee/getAll/${companyId}`);

    return response.data;
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employee: FormData) => {
    const response = await axiosInstance.post("/employee/create", employee, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (employeeId: string) => {
    const response = await axiosInstance.delete(
      `/employee/delete/${employeeId}`
    );

    return response.data;
  }
);

export const dismissEmployee = createAsyncThunk(
  "employee/dismiss",
  async (employeeId: number) => {
    const response = await axiosInstance.put(`/employee/dismiss/${employeeId}`);

    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    });
    builder.addCase(getEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "An error occurred";
    });
    builder.addCase(createEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees.push(action.payload);
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "An error occurred";
    });
    builder.addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Unablee to delete employee";
    });
    builder.addCase(dismissEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(dismissEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = [
        ...state.employees.map((employee) => {
          if (employee.id === action.payload.id) {
            return {
              ...employee,
              isDismissed: true,
            };
          } else {
            return employee;
          }
        }),
      ];
    });
    builder.addCase(dismissEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Unablee to dismiss employee";
    });
  },
});

export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
