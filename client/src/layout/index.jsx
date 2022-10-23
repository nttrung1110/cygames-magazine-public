import { Fragment, useEffect, memo } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

import { getArticles } from "~/api/article";

import { setArticles } from "~/redux/articleSlice";

const Layout = ({
  children,
  navigationBar = false,
  showNavigationBarMobile = false,
}) => {
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

      {navigationBar && showNavigationBarMobile ? (
        <Navigation />
      ) : (
        navigationBar && !isMobile && <Navigation />
      )}

      {children}

      <Footer />
    </Fragment>
  );
};

export default memo(Layout);
