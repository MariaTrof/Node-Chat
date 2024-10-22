import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types";
import { AxiosError } from "axios";
import GroupService from "../../http/service/group.services";

interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (id: number, { rejectWithValue }) => {
    try {
      await GroupService.deleteGroup(id);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "");
    }
  }
);

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await GroupService.createGroup({ name });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "");
    }
  }
);

export const getGroups = createAsyncThunk(
  "groups/getGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GroupService.getGroups();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "");
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearGroups(state) {
      state.groups = [];
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action: PayloadAction<Group>) => {
        state.loading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroups.fulfilled, (state, action: PayloadAction<Group[]>) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Обработка удаления группы
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteGroup.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.groups = state.groups.filter(
            (group) => group.id !== action.payload
          );
        }
      )
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setError, clearGroups, clearError } = groupSlice.actions;

export const groupReducer = groupSlice.reducer;
