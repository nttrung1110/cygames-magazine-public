import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
  },
  reducers: {
    setTag_slice(state, action) {
      state.tags = action.payload.tags.map((tag) => {
        return {
          value: tag._id,
          label: tag.title,
          slug: tag.slug,
          createdAt: tag.createdAt,
        };
      });
    },
    updateTag_slice(state, action) {
      state.tags = state.tags.map((tag) => {
        if (tag.value === action.payload.value) {
          return { ...action.payload.updatedTag };
        }

        return tag;
      });
    },
    deleteTag_slice(state, action) {
      state.tags = state.tags.filter(
        (tag) => tag.value !== action.payload.tagId
      );
    },
    addTag_slice(state, action) {
      state.tags = [
        {
          value: action.payload._id,
          label: action.payload.title,
          slug: action.payload.slug,
          createdAt: action.payload.createdAt,
        },
        ...state.tags,
      ];
    },
  },
  extraReducers: {},
});

export default tagSlice.reducer;

export const { setTag_slice, updateTag_slice, deleteTag_slice, addTag_slice } =
  tagSlice.actions;
