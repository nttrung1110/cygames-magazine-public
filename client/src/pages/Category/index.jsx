import { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import ArticleList from "~/components/ArticleList";
import Breadcrumb from "~/components/Breadcrumb";
import LinkImage from "~/components/LinkImage";
import NotFound from "~/components/NotFound";
import Pagination from "~/components/Pagination";
import RankList from "~/components/RankList";
import Spinner from "~/components/Spinner";
import TagList from "~/components/TagList";
import Navigation from "~/components/Navigation";

import CATEGORY from "~/assets/category";
import images from "~/assets/images";

import checkPage from "~/utils/checkPage";

import { getArticles } from "~/api/article";

import classNames from "classnames/bind";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

const Category = () => {
  const params = useParams();

  const { slug, page } = params;

  const [notfound, setNotfound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [articles, setArticles] = useState([]);
  const [totalPage, setTotalPage] = useState(999);
  const [paginateUrl, setPaginateUrl] = useState("");

  const fetchArticlesByCategory = async (category, page = 1) => {
    setLoading(true);

    const { articles, totalPage, error } = await getArticles(
      category === "ALL" ? null : category,
      null,
      page
    );

    setLoading(false);

    if (error) return console.log(error);

    setArticles(articles);
    setTotalPage(totalPage);
  };

  useEffect(() => {
    const category = CATEGORY.find((category) => {
      return category.path === (slug ? slug : "all");
    });

    setNotfound(false);

    if (category === undefined) return setNotfound(true);

    if (category.path === "all") {
      setPaginateUrl("/all");
    } else {
      setPaginateUrl(`/archives/category/${category.path}`);
    }

    setCategory(category);

    fetchArticlesByCategory(category.name, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, category, page]);

  const handlePageChange = async (data) => {
    const currentPage = data.selected + 1;

    await fetchArticlesByCategory(category.name, currentPage);
  };

  if (notfound || !checkPage(page ? page : 1, totalPage)) {
    return <NotFound />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          {`${category.name ? category.name + " | " : ""}`}Cygames Magazine |
          Cygames
        </title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <Navigation />

      <div className={cx("top", { mobile: isMobile })}>
        <div className={cx("wrapper", { mobile: isMobile })}>
          <Breadcrumb
            data={[
              {
                name: category.name,
                path: false,
              },
            ]}
            className={isMobile && "category--mobile"}
          />

          <div className={cx("title", { mobile: isMobile })}>
            <div className={cx("inner", { mobile: isMobile })}>
              <h2>{category.name}</h2>
              {category.description && <span>{category.description}</span>}
            </div>
          </div>

          <TagList
            limit={10}
            className={isMobile ? cx("category--mobile") : cx("category")}
          />
        </div>
      </div>

      <div className={cx("bottom", { mobile: isMobile })}>
        <div className={cx("main", { mobile: isMobile })}>
          {!loading && articles.length > 0 ? (
            <Fragment>
              <ArticleList articles={articles} />
              <Pagination
                handlePageChange={handlePageChange}
                pageCount={totalPage}
                currentPage={page ? page : 1}
                url={paginateUrl}
                className={isMobile && "category--mobile"}
              />
            </Fragment>
          ) : (
            <Spinner />
          )}
        </div>

        <div className={cx("sub", { mobile: isMobile })}>
          <RankList />

          <LinkImage
            image={images.Link_Home_2}
            url={"tech"}
            className={isMobile && cx("category--mobile")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
