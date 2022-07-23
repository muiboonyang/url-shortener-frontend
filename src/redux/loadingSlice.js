import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
  },
});

// Exports the redux actions
export const { loding } = loadingSlice.actions;

// Exports the reducer
export default loadingSlice.reducer;
