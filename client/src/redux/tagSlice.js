import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    loading: true,
  },
  reducers: {
    setTags(state, action) {
      return {
        tags: action.payload.tags,
        loading: false,
      };
    },
  },
  extraReducers: {},
});

export default tagSlice.reducer;

export const { setTags } = tagSlice.actions;
