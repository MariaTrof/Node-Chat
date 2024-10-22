import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Conference } from "../../types";
import { AxiosError } from "axios";
import ConferenceService from "../../http/service/conf.services";


interface ConferenceState {
  conferences: Conference[];
  loading: boolean;
  error: string | null;
}

const initialState: ConferenceState = {
  conferences: [],
  loading: false,
  error: null,
};

export const createConference = createAsyncThunk(
  "conferences/createConference",
  async (
    {
      title,
      description,
      groupId,
      startTime,
      endTime,
    }: {
      title: string;
      description: string;
      groupId: number;
      startTime: Date;
      endTime: Date;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await ConferenceService.createConference({
        title,
        description,
        groupId,
        startTime,
        endTime,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "");
    }
  }
);

export const getConferencesByGroup = createAsyncThunk(
  "conferences/getConferencesByGroup",
  async (groupId: number, { rejectWithValue }) => {
    try {
      const response = await ConferenceService.getConferencesByGroup(groupId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "");
    }
  }
);

export const endConference = createAsyncThunk(
  "conferences/endConference",
  async (id: number, { rejectWithValue }) => {
    try {
      await ConferenceService.endConference(id);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "");
    }
  }
);

const conferenceSlice = createSlice({
  name: "conferences",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearConferences(state) {
      state.conferences = [];
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createConference.fulfilled,
        (state, action: PayloadAction<Conference>) => {
          state.loading = false;
          state.conferences.push(action.payload);
        }
      )
      .addCase(createConference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getConferencesByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getConferencesByGroup.fulfilled,
        (state, action: PayloadAction<Conference[]>) => {
          state.loading = false;
          state.conferences = action.payload;
        }
      )
      .addCase(getConferencesByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(endConference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        endConference.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.conferences = state.conferences.filter(
            (conference) => conference.id !== action.payload
          );
        }
      )
      .addCase(endConference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setError, clearConferences, clearError } =
  conferenceSlice.actions;

export const confReducer = conferenceSlice.reducer;
