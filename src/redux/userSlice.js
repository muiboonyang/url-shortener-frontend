import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profileName: "",
    user: "",
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.profileName = action.payload;
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.profileName = "";
      state.user = "";
      state.loggedIn = false;
    },
  },
});

// Exports the redux actions
export const { login, logout } = userSlice.actions;

// Export the states
export const profileNameState = (state) => state.user.profileName;
export const userState = (state) => state.user.user;
export const loginStatusState = (state) => state.user.loggedIn;

// Exports the reducer
export default userSlice.reducer;
