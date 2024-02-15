import { axiosInstance } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  nickname: string | null;
  avatarUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  nickname: null,
  avatarUrl: null,
  loading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk("user/info", async () => {
  const response = await axiosInstance.get("/auth/userInfo");

  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.nickname = action.payload.nickname;
      state.avatarUrl = action.payload.avatarUrl;
    });

    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
