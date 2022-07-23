import { createSlice } from "@reduxjs/toolkit";

const renderSlice = createSlice({
  name: "render",
  initialState: {
    renderCount: 0,
  },
  reducers: {
    render: (state) => {
      state.value += 1;
    },
  },
});

// Exports the redux actions
export const { render } = renderSlice.actions;

// Exports the reducer
export default renderSlice.reducer;
