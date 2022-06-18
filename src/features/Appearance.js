import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: false,
};

export const AppearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    setDark: (state, action) => {
      state.dark = action.payload;
    },
  },
});

export const { setDark } = AppearanceSlice.actions;

export default AppearanceSlice.reducer;
