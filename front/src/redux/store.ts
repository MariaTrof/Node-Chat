import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { messageReducer } from "./slice/messageSlice";
import { groupReducer } from "./slice/groupSlice";
import { groupMembersReducer } from "./slice/group_memberSlice";
import { userReducer } from "./slice/userSlice";
import { confReducer } from "./slice/confSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    group: groupReducer,
    group_members: groupMembersReducer,
    user: userReducer,
    conf: confReducer,
    // admin: adminReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

