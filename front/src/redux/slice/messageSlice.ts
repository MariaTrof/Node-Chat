import {
  PayloadAction,
  Reducer,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import MessageService from "../../http/service/message.services";
import { Messages } from "../../types";

const initialState = {
  messages: [] as Messages[],
  count: 0, // Для хранения общего количества сообщений
  loading: false,
  error: null as string | null,
  page: 1, // Текущая страница
  limit: 5, // Максимальное количество сообщений на странице
};

export const updateMessage = createAsyncThunk(
  "messages/updateMessage",
  async (message: { id: number; content: string }): Promise<Messages> => {
    const response = await MessageService.updateMessage(message);
    return response.data;
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id: number): Promise<number> => {
    await MessageService.deleteMessage(id);
    return id; // Возвращаем id для фильтрации на клиенте
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({
    groupId,
    limit,
    offset,
  }: {
    groupId: number;
    limit: number;
    offset: number;
  }): Promise<{ messages: Messages[]; count: number }> => {
    const response = await MessageService.getMessages(groupId, limit, offset); // Предполагаем, что этот метод может принимать limit и offset
    return {
      messages: response.data,
      count: response.headers["x-total-count"],
    }; // Также предположим, что сервер возвращает общее количество в заголовке
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({
    groupId,
    content,
  }: {
    groupId: number;
    content: string;
  }): Promise<Messages> => {
    const response = await MessageService.sendMessage({ groupId, content });
    return response.data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
builder.addCase(fetchMessages.fulfilled, (state, action) => {
  state.loading = false;
  state.messages = action.payload.messages; // Устанавливаем массив сообщений
  state.count = Number(action.payload.count); // Присваиваем общее количество
});

    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as AxiosError).message;
    });

    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      sendMessage.fulfilled,
      (state, action: PayloadAction<Messages>) => {
        state.loading = false;
        state.messages.push(action.payload);
      }
    );
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as AxiosError).message;
    });
    builder.addCase(
      updateMessage.fulfilled,
      (state, action: PayloadAction<Messages>) => {
        const index = state.messages.findIndex(
          (message) => message.id === action.payload.id
        );
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      }
    );

    builder.addCase(
      deleteMessage.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload
        );
      }
    );
  },
});
export const { setError, clearMessages, setPage } = messageSlice.actions;

export const messageReducer = messageSlice.reducer as Reducer<
  typeof initialState
>;
