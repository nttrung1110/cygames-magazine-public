import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ArticleForm, { defaultArticle } from "../components/ArticleForm";

import { setLoading_slice } from "../redux/loadingSlice";
import { setToastify_slice } from "../redux/toastifySlice";

import { postArticle } from "../services/articleService";

const CreateArticle = () => {
  const [unsavedArticle, setUnsavedArticle] = useState(defaultArticle);

  const dispatch = useDispatch();

  const handleSaveLocalStorage = (articleForm) => {
    localStorage.setItem("articleForm", JSON.stringify(articleForm));
  };

  const handleCreateArticle = async (formData) => {
    dispatch(setLoading_slice(true));

    const { error } = await postArticle(formData);

    dispatch(setLoading_slice(false));

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    localStorage.removeItem("articleForm");

    dispatch(
      setToastify_slice({
        type: "success",
        text: "Article was successfully created!",
      })
    );

    return { resetData: true };
  };

  useEffect(() => {
    const articleForm = localStorage.getItem("articleForm");

    if (!articleForm) return;

    const article = JSON.parse(articleForm);

    setUnsavedArticle({ ...article });
  }, []);

  return (
    <ArticleForm
      pageTitle="Create Article"
      btnSubmitTitle="Post Article"
      handleSaveLocalStorage={handleSaveLocalStorage}
      handleSubmitFormData={handleCreateArticle}
      article={unsavedArticle}
    />
  );
};

export default CreateArticle;
