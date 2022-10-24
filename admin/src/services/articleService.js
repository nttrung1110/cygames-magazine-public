import * as httpRequest from "../utils/httpRequest";

import { deleteArticle_slice } from "../redux/articleSlice";
import { setLoading_slice } from "../redux/loadingSlice";
import { setToastify_slice } from "../redux/toastifySlice";

export const postArticle = async (formData) => {
  try {
    const res = await httpRequest.postAPI("article/create", {
      formData,
    });

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const getArticles = async (page) => {
  try {
    const res = await httpRequest.getAPI(`article/getArticles?page=${page}`);

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const getArticle = async (articleId) => {
  try {
    const res = await httpRequest.getAPI(`article/getArticle/${articleId}`);

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const putArticle = async (articleId, formData) => {
  try {
    const res = await httpRequest.putAPI(`article/update/${articleId}`, {
      formData,
    });

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const res = await httpRequest.deleteAPI(`article/delete/${articleId}`);

    return res;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response.data;
    }

    return { error: error.message || error };
  }
};

export const searchArticle = async (search_keyword) => {
  try {
    const res = await httpRequest.getAPI(
      `article/search?s=${encodeURIComponent(search_keyword)}`
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

// handle

export const handleDeleteArticle = async (navigate, dispatch, articleId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this article?"
  );

  if (!confirmed) return;

  dispatch(setLoading_slice(true));

  const { msg, totalPage, error } = await deleteArticle(articleId);

  dispatch(setLoading_slice(false));

  if (error) {
    return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
  }

  dispatch(deleteArticle_slice({ articleId, totalPage }));

  dispatch(setToastify_slice({ type: "success", text: msg }));

  navigate("/");
};
