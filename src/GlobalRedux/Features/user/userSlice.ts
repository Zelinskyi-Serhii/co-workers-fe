import { axiosInstance } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  nickname: string | null;
  avatarUrl: string | null;
  isLoadingGetInfo: boolean;
  error: string | null;
  isLoadingUpdateUser: boolean;
  isLoadingChangePassword: boolean;
}

const initialState: UserState = {
  nickname: null,
  avatarUrl: null,
  isLoadingGetInfo: true,
  isLoadingUpdateUser: false,
  error: null,
  isLoadingChangePassword: false,
};

export const getUserInfo = createAsyncThunk("user/info", async () => {
  const response = await axiosInstance.get("/auth/userInfo");

  return response.data;
});

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (newAvatar: FormData) => {
    const response = await axiosInstance.put("/auth/changeAvatar", newAvatar, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwords: { oldPassword: string; newPassword: string }) => {
    const response = await axiosInstance.put("/auth/changePassword", passwords);

    return response.data;
  }
);

export const changeNickname = createAsyncThunk(
  "user/changeNickname",
  async (nickname: string) => {
    const response = await axiosInstance.put("/auth/changeNickname", {
      nickname,
    });

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.isLoadingGetInfo = true;
      state.error = null;
    });

    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoadingGetInfo = false;
      state.nickname = action.payload.nickname;
      state.avatarUrl = action.payload.avatarUrl;
    });

    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.isLoadingGetInfo = false;
      state.error = action.error.message || "Unable to get user info";
    });

    builder.addCase(changeAvatar.pending, (state) => {
      state.isLoadingUpdateUser = true;
      state.error = null;
    });

    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.isLoadingUpdateUser = false;
      state.avatarUrl = action.payload.url;
    });

    builder.addCase(changeAvatar.rejected, (state, action) => {
      state.isLoadingUpdateUser = false;
      state.error = action.error.message || "Unable to update avatar";
    });

    builder.addCase(changePassword.pending, (state) => {
      state.isLoadingChangePassword = true;
      state.error = null;
    });

    builder.addCase(changePassword.fulfilled, (state) => {
      state.isLoadingChangePassword = false;
    });

    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoadingChangePassword = false;

      state.error = "Unable to change password";
    });

    builder.addCase(changeNickname.pending, (state) => {
      state.isLoadingUpdateUser = true;
      state.error = null;
    });

    builder.addCase(changeNickname.fulfilled, (state, action) => {
      state.isLoadingUpdateUser = false;
      state.nickname = action.payload.nickname;
    });

    builder.addCase(changeNickname.rejected, (state, action) => {
      state.isLoadingUpdateUser = false;
      state.error = "Unable to change nickname";
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
