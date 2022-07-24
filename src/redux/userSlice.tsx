import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    username: "",
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.username = "";
      state.loggedIn = false;
    },
    update: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Exports the redux actions
export const { login, logout, update } = userSlice.actions;

// Selector - Export the states
export const nameState = (state: RootState) => state.user.name;
export const usernameState = (state: RootState) => state.user.username;
export const loginStatusState = (state: RootState) => state.user.loggedIn;

// Exports the reducer
export default userSlice.reducer;
