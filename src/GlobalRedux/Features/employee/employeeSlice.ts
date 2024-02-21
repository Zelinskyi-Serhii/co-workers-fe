import { axiosInstance } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IEmployee {
  id: number,
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
  },
});

export const {} = employeeSlice.actions;
export default employeeSlice.reducer;