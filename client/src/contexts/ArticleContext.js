import { createContext, useReducer, useState } from "react";
import { articleReducer } from "../reducers/articleReducer";
import {
  apiUrl,
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
} from "./_constants";
import axios from "axios";

export const ArticleContext = createContext();

const ArticleContextProvider = ({ children }) => {
  // Article state
  const [articleState, dispatch] = useReducer(articleReducer, {
    article: {},
    next_article: null,
    prev_article: null,
    relate_articles: [],
    articles: [],
    articles_category: [],
    articles_tag: [],
    articles_search: [],
    articles_rank: [],
    articlesHomeLoading: true,
    articlesLoading: true,
    articlesRankLoading: true,
    pageCountFromServer: 7777,
  });

  // Page state
  const limit = 2;

  // Get all articles
  const getArticles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/articles`);
      if (response.data.success) {
        dispatch({
          type: ARTICLES_LOADED_SUCCESS,
          payload: response.data.articles,
        });
      }
    } catch (err) {
      dispatch({ type: ARTICLES_LOADED_FAIL });
    }
  };

  // Get rank articles
  const getRankArticles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/articles/rank`);
      if (response.data.success) {
        dispatch({
          type: ARTICLES_RANK_LOADED_SUCCESS,
          payload: response.data.articles,
        });
      }
    } catch (err) {
      dispatch({ type: ARTICLES_RANK_LOADED_FAIL });
    }
  };

  // Get all articles by category with page
  const getArticlesbyCategory = async (category_name, page) => {
    try {
      let response = null;
      if (category_name === "all") {
        response = await axios.get(
          `${apiUrl}/articles/page/${page}/limit/${limit}`
        );
      } else {
        response = await axios.get(
          `${apiUrl}/category/${category_name}/page/${page}/limit/${limit}`
        );
      }

      if (response.data.success) {
        dispatch({
          type: ARTICLES_CATEGORY_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({ type: ARTICLES_CATEGORY_LOADED_FAIL });
    }
  };

  // Get all articles by tag
  const getArticlesbyTag = async (tag_name, page) => {
    try {
      const response = await axios.get(
        `${apiUrl}/tags/${tag_name}/page/${page}/limit/${limit}`
      );

      if (response.data.success) {
        dispatch({
          type: ARTICLES_TAG_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({ type: ARTICLES_TAG_LOADED_FAIL });
    }
  };

  const [searchCount, setSearchCount] = useState(null);
  // Get all articles by search value
  const getArticlesbySearchValue = async (search_value, page) => {
    try {
      const response = await axios.get(
        `${apiUrl}/search/page/${page}/limit/${limit}?s=${search_value}`
      );

      if (response.data.success) {
        setSearchCount(response.data.count);
        dispatch({
          type: ARTICLES_SEARCH_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({ type: ARTICLES_SEARCH_LOADED_FAIL });
    }
  };

  // Get single article by id
  const getArticlebyId = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/articles/${id}`);

      if (response.data.success) {
        dispatch({
          type: ARTICLE_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({ type: ARTICLE_LOADED_FAIL });
    }
  };

  const resetLoading = () => {
    dispatch({
      type: RESET_LOADING,
    });
  };

  // Article context data
  const ArticleContextData = {
    articleState,
    getArticles,
    getRankArticles,
    getArticlesbyCategory,
    getArticlesbyTag,
    getArticlesbySearchValue,
    getArticlebyId,
    searchCount,
    limit,
    resetLoading,
  };

  // Return provider
  return (
    <ArticleContext.Provider value={ArticleContextData}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
