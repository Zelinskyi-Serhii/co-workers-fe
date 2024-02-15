import { axiosInstance } from "@/api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PayloadLogin = {
  accessToken: string;
}

interface AuthState {
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      login.fulfilled,
      (
        state,
        action,
      ) => {
        state.loading = false;
        localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken));
        
      }
    );

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
