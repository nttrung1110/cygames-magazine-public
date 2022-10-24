import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ArticleForm from "../components/ArticleForm";

import { setToastify_slice } from "../redux/toastifySlice";
import { setLoading_slice } from "../redux/loadingSlice";

import { getArticle, putArticle } from "../services/articleService";

const UpdateArticle = () => {
  const [article, setArticle] = useState();

  const dispatch = useDispatch();

  const { slug } = useParams();

  const navigate = useNavigate();

  const fetchArticle = async () => {
    dispatch(setLoading_slice(true));

    const { article, error } = await getArticle(slug);

    dispatch(setLoading_slice(false));

    if (error) {
      dispatch(setToastify_slice({ type: "error", text: error[0].msg }));

      return navigate("/");
    }

    setArticle({ ...article, tags: article.tags.map((tag) => tag._id) });
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateArticle = async (formData) => {
    dispatch(setLoading_slice(true));

    const { error } = await putArticle(article._id, formData);

    dispatch(setLoading_slice(false));

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    dispatch(
      setToastify_slice({
        type: "success",
        text: "Article was successfully updated.",
      })
    );

    return { resetData: false };
  };

  return (
    <ArticleForm
      pageTitle="Update Article"
      btnSubmitTitle="Update Article"
      article={article}
      handleSubmitFormData={handleUpdateArticle}
    />
  );
};

export default UpdateArticle;
