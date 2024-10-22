import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Group_Members } from "../../types/group_members.interface";
import GroupService from "../../http/service/group_member.services";


interface GroupMembersState {
  members: Group_Members[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupMembersState = {
  members: [],
  loading: false,
  error: null,
};

// Получить членов группы
export const fetchGroupMembers = createAsyncThunk(
  "groups/fetchGroupMembers",
  async (groupId: number): Promise<Group_Members[]> => {
    const response = await GroupService.getGroupMembers(groupId);
    return response.data;
  }
);

// Добавить пользователя в группу
export const addUserToGroup = createAsyncThunk(
  "groups/addUserToGroup",
  async (groupMember: Group_Members): Promise<Group_Members> => {
    const response = await GroupService.addUserToGroup(groupMember);
    return response.data;
  }
);

// Удалить пользователя из группы
export const removeUserFromGroup = createAsyncThunk(
  "groups/removeUserFromGroup",
  async (groupMember: Group_Members): Promise<void> => {
    await GroupService.removeUserFromGroup(groupMember);
  }
);

const groupMembersSlice = createSlice({
  name: "groupMembers",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearMembers(state) {
      state.members = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMembers.pending, (state) => {
        state.loading = true;
        state.error = null; // Очистка ошибки при новом запросе
      })
      .addCase(
        fetchGroupMembers.fulfilled,
        (state, action: PayloadAction<Group_Members[]>) => {
          state.loading = false;
          state.members = action.payload;
        }
      )
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as AxiosError).message; // Обработка ошибки
      })
      .addCase(addUserToGroup.pending, (state) => {
        state.loading = true;
        state.error = null; // Очистка ошибки при новом запросе
      })
      .addCase(
        addUserToGroup.fulfilled,
        (state, action: PayloadAction<Group_Members>) => {
          state.loading = false;
          state.members.push(action.payload); // Добавляем нового участника
        }
      )
      .addCase(addUserToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as AxiosError).message; // Обработка ошибки
      })
      // Другие действия
      .addCase(removeUserFromGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUserFromGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Обработка удаления
        state.members = state.members.filter(
          (member) =>
            !(
              member.userId === action.meta.arg.userId &&
              member.groupId === action.meta.arg.groupId
            )
        );
      })
      .addCase(removeUserFromGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as AxiosError).message;
      });
  },
});


export const { setError, clearMembers } = groupMembersSlice.actions;

export const groupMembersReducer = groupMembersSlice.reducer;
