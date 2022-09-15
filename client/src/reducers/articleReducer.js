import {
  ARTICLES_LOADED_SUCCESS,
  ARTICLES_LOADED_FAIL,
  ARTICLES_CATEGORY_LOADED_SUCCESS,
  ARTICLES_CATEGORY_LOADED_FAIL,
  ARTICLES_TAG_LOADED_SUCCESS,
  ARTICLES_TAG_LOADED_FAIL,
  ARTICLES_SEARCH_LOADED_SUCCESS,
  ARTICLES_SEARCH_LOADED_FAIL,
  ARTICLE_LOADED_SUCCESS,
  ARTICLE_LOADED_FAIL,
  RESET_LOADING,
  ARTICLES_RANK_LOADED_SUCCESS,
  ARTICLES_RANK_LOADED_FAIL,
} from "../contexts/_constants";

export const articleReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ARTICLES_LOADED_SUCCESS:
      return {
        ...state,
        articles: payload,
        articlesLoading: false,
        articlesHomeLoading: false,
      };
    case ARTICLES_LOADED_FAIL:
      return {
        ...state,
        articles: [],
        articlesLoading: false,
        articlesHomeLoading: false,
      };
    case ARTICLES_CATEGORY_LOADED_SUCCESS:
      return {
        ...state,
        articles_category: payload.articles,
        articlesLoading: false,
        pageCountFromServer: payload.totalPage,
      };
    case ARTICLES_CATEGORY_LOADED_FAIL:
      return {
        ...state,
        articles_category: [],
        articlesLoading: false,
      };
    case ARTICLES_TAG_LOADED_SUCCESS:
      return {
        ...state,
        articles_tag: payload.articles,
        articlesLoading: false,
        pageCountFromServer: payload.totalPage,
      };
    case ARTICLES_TAG_LOADED_FAIL:
      return {
        ...state,
        articles_tag: [],
        articlesLoading: false,
      };
    case ARTICLES_SEARCH_LOADED_SUCCESS:
      return {
        ...state,
        articles_search: payload.articles,
        articlesLoading: false,
        pageCountFromServer: payload.totalPage,
      };
    case ARTICLES_SEARCH_LOADED_FAIL:
      return {
        ...state,
        articles_search: [],
        articlesLoading: false,
      };
    case ARTICLE_LOADED_SUCCESS:
      return {
        ...state,
        article: payload.article,
        next_article: payload.nextArticle,
        prev_article: payload.prevArticle,
        relate_articles: payload.relateArticle,
        articlesLoading: false,
      };
    case ARTICLE_LOADED_FAIL:
      return {
        ...state,
        article: null,
        next_article: null,
        prev_article: null,
        relate_articles: [],
        articlesLoading: false,
      };
    case ARTICLES_RANK_LOADED_SUCCESS:
      return {
        ...state,
        articles_rank: payload,
        articlesRankLoading: false,
      };
    case ARTICLES_RANK_LOADED_FAIL:
      return {
        ...state,
        articles_rank: [],
        articlesRankLoading: false,
      };
    case RESET_LOADING:
      return {
        ...state,
        articlesLoading: true,
        pageCountFromServer: 7777,
      };
    default:
      return state;
  }
};
