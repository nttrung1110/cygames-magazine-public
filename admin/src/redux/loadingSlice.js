import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading_slice(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

export default loadingSlice.reducer;

export const { setLoading_slice } = loadingSlice.actions;
