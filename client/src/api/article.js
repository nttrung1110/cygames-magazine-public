import * as httpRequest from "../utils/httpRequest";

export const getArticles = async (category, tag, page) => {
  try {
    const res = await httpRequest.getAPI(
      `article/getArticles?category=${category}&tag=${tag}&page=${page}`
    );

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const getArticlesRank = async () => {
  try {
    const res = await httpRequest.getAPI(`article/rank`);

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const getArticle = async (slug) => {
  try {
    const res = await httpRequest.getAPI(`article/getArticle/${slug}`);

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const searchArticle = async (search_keyword, page) => {
  try {
    const res = await httpRequest.getAPI(
      `article/search?s=${encodeURIComponent(search_keyword)}&page=${page}`
    );

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};
