import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    totalPage: 0,
    loading: true,
  },
  reducers: {
    setArticles(state, action) {
      return {
        articles: action.payload.articles,
        totalPage: action.payload?.totalPage || state.totalPage,
        loading: false,
      };
    },
  },
  extraReducers: {},
});

export default articleSlice.reducer;

export const { setArticles } = articleSlice.actions;
