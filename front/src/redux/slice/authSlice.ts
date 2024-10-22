import {
  PayloadAction,
  Reducer,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Tokens } from "../../types";
import AuthService from "../../http/service/auth.services";


interface Credentials {
  user_name: string;
  user_password: string;
}
const initialState = {
  isAuth: false as boolean,
  accessToken: null as string | null,
  refreshToken: null as string | null,
  loading: false as boolean,
  error: null as string | null,
};
export const login = createAsyncThunk(
  "auth/login",
  async ({ user_name, user_password }: Credentials): Promise<Tokens> => {
    const response = await AuthService.login({ user_name, user_password });
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ user_name, user_password }: Credentials): Promise<Tokens> => {
    const response = await AuthService.registration({ user_name, user_password });
    return response.data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (): Promise<void> => {
    await AuthService.logout();
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (): Promise<Tokens> => {
    const response = await axios.post<Tokens>(
      `${import.meta.env.API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setTokens(state, action: PayloadAction<Tokens>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    });
   builder.addCase(login.rejected, (state, action) => {
     state.loading = false;
     state.error = (action.error && action.error.message) || "Ошибка входа";
     state.accessToken = null;
     state.refreshToken = null;
     state.isAuth = false;
   });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as AxiosError).message;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuth = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = true;
      localStorage.removeItem("accessToken");
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = null;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
      state.isAuth = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  },
});

export const { setError, setTokens } = authSlice.actions;

export const authReducer = authSlice.reducer as Reducer<typeof initialState>;