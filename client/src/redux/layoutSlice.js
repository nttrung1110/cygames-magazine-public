import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    languageMenu: false,
    hamburgerMenu: false,
  },
  reducers: {
    setLayout(state, action) {
      state.languageMenu = action.payload.languageMenu;
      state.hamburgerMenu = action.payload.hamburgerMenu;
    },
  },
  extraReducers: {},
});

export default layoutSlice.reducer;

export const { setLayout } = layoutSlice.actions;
