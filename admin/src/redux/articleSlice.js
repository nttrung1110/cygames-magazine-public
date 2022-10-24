import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    totalPage: 0,
  },
  reducers: {
    setArticles_slice(state, action) {
      state.articles = action.payload.articles;
      state.totalPage = action.payload.totalPage;
    },
    deleteArticle_slice(state, action) {
      state.articles = state.articles.filter(
        (article) => article._id !== action.payload.articleId
      );
      state.totalPage = action.payload.totalPage;
    },
  },
  extraReducers: {},
});

export default articleSlice.reducer;

export const { setArticles_slice, deleteArticle_slice } = articleSlice.actions;
