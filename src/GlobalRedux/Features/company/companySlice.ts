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
  isLoading: boolean;
  error: string | null;
}

const initialState: ICompanyState = {
  company: [],
  isLoading: false,
  error: null,
};

export const getAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async () => {
    const response = await axiosInstance.get("/company/getAll");

    return response.data;
  }
);

export const createCompany = createAsyncThunk(
  "company/create",
  async (data: FormData) => {
    const response = await axiosInstance.post("/company/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCompanies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company = action.payload;
    });

    builder.addCase(getAllCompanies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(createCompany.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company = [...state.company, action.payload];
    });

    builder.addCase(createCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { } = companySlice.actions;
export default companySlice.reducer;
