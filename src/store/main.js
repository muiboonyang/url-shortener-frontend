import { createSlice, configureStore } from "@reduxjs/toolkit";

// Similar to useReducer, but using functions instead of switch

const userSlice = createSlice({
  name: "user",
  initialState: { username: "", auth: false },
  reducers: {
    login(state, action) {
      state.username = action.payload;
      state.auth = true;
    },
    logout(state) {
      state.username = "";
      state.auth = false;
    },
  },
});

const store = configureStore({ reducer: userSlice.reducer });

export const userActions = userSlice.actions;
export default store;
