import { Fragment, memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer";
import Header from "./components/Header";

import { getArticles } from "~/api/article";

import { setArticles } from "~/redux/articleSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const fetchArticles = async () => {
    const { articles, error, totalPage } = await getArticles(null, null, 1);

    if (error) console.log(error);

    dispatch(setArticles({ articles, totalPage }));
  };

  useEffect(() => {
    fetchArticles();
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
