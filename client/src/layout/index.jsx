import { Fragment, memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer";
import Header from "./components/Header";

import { getArticles } from "~/api/article";
import { getArticlesRank } from "~/api/article";
import { getTags } from "~/api/tag";

import { setArticles } from "~/redux/articleSlice";
import { setArticlesRank } from "~/redux/articleSlice";
import { setTags } from "~/redux/tagSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const fetchArticles = async () => {
    const { articles, error, totalPage } = await getArticles();

    if (error) return console.log(error);

    dispatch(setArticles({ articles, totalPage }));
  };

  const fetchTags = async () => {
    const { tags, error } = await getTags();

    if (error) return console.log(error);

    dispatch(setTags({ tags }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const fetchArticlesRank = async () => {
    const { articles, error } = await getArticlesRank();

    if (error) return console.log(error);

    dispatch(setArticlesRank({ articles }));
  };

  useEffect(() => {
    fetchArticles();
    fetchTags();
    fetchArticlesRank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Header />

      {children}

      <Footer />
    </Fragment>
  );
};

export default memo(Layout);
