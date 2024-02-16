import { axiosInstance } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ICompany {
  id: number;
  name: string;
  avatarUrl: string;
  ownedAt: Date;
  ownerName: string;
}

interface ICompanyState {
  company: ICompany[];
  loading: boolean;
  error: string | null;
}

const initialState: ICompanyState = {
  company: [],
  loading: true,
  error: null,
};

export const getAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async () => {
    const response = await axiosInstance.get("/company/getAll");

    return response.data;
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCompanies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.company = action.payload;
    });

    builder.addCase(getAllCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});


export const {} = companySlice.actions;
export default companySlice.reducer;
