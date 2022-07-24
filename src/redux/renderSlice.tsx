import { createSlice } from "@reduxjs/toolkit";

const renderSlice = createSlice({
  name: "render",
  initialState: {
    renderCount: 0,
  },
  reducers: {
    addRenderCount: (state) => {
      state.value += 1;
    },
  },
});

// Exports the redux actions
export const { addRenderCount } = renderSlice.actions;

// Exports the reducer
export default renderSlice.reducer;
