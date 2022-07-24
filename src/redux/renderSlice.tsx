import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  renderCount: number;
}

const initialState: CounterState = {
  renderCount: 0,
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    addRenderCount: (state) => {
      state.renderCount += 1;
    },
  },
});

// Exports the redux actions
export const { addRenderCount } = renderSlice.actions;

// Exports the reducer
export default renderSlice.reducer;
