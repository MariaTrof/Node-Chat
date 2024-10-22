import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};
interface UpdateUserPayload {
  userId: number;
  user_password?: string; 
  profile_picture?: FormData; 
}

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: UpdateUserPayload) => {
    const { userId, ...rest } = data; 
    const response = await axios.patch(`/api/users/${userId}`, rest);
    return response.data;
  }
);

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("/api/users/me"); 
  return response.data;
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка получения пользователя";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.user) {
          state.user.user_password = action.payload.user_password; 
        }
      });
  },
});

export const userReducer = userSlice.reducer;
