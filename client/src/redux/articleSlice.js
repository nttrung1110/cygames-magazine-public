import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    articlesRank: [],
    totalPage: 0,
    loading: true,
    loadingArticlesRank: true,
  },
  reducers: {
    setArticles(state, action) {
      return {
        ...state,
        articles: action.payload.articles,
        totalPage: action.payload?.totalPage || state.totalPage,
        loading: false,
      };
    },
    setArticlesRank(state, action) {
      return {
        ...state,
        articlesRank: action.payload.articles,
        loadingArticlesRank: false,
      };
    },
  },
  extraReducers: {},
});

export default articleSlice.reducer;

export const { setArticles, setArticlesRank } = articleSlice.actions;
