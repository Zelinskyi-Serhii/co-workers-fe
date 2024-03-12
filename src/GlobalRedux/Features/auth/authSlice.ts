import { axiosInstance } from "@/api/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PayloadLogin = {
  accessToken: string;
};

type SignUp = {
  email: string;
  password: string;
  nickname: string;
};

interface AuthState {
  isLoading: boolean;
  error: null | string;
  isAvialableNickName: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  isAvialableNickName: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  }
);

export const checkNickname = createAsyncThunk(
  "auth/checkNickname",
  async (nickname: string) => {
    const response = await axiosInstance.post("/auth/checkNickname", {
      nickname,
    });

    return response.data;
  }
);

export const signup = createAsyncThunk("auth/signup", async (data: SignUp) => {
  const response = await axiosInstance.post("/auth/signup", data);

  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<PayloadLogin>) => {
        state.isLoading = false;
        state.error = null;
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    );

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(checkNickname.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(checkNickname.fulfilled, (state, action) => {
      state.isAvialableNickName = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(checkNickname.rejected, (state) => {
      state.isAvialableNickName = false;
      state.isLoading = false;
      state.error = "Nickname already exist";
    });

    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<PayloadLogin>) => {
        state.isLoading = false;
        state.error = null;
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      }
    );

    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Email already used";
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
