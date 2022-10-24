import { createSlice } from "@reduxjs/toolkit";

const toastifySlice = createSlice({
  name: "toastify",
  initialState: {
    type: "",
    text: "",
  },
  reducers: {
    setToastify_slice(state, action) {
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
  },
  extraReducers: {},
});

export default toastifySlice.reducer;

export const { setToastify_slice } = toastifySlice.actions;
