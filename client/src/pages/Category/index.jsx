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

  const [category, setCategory] = useState({});
  const [paginateUrl, setPaginateUrl] = useState("");
  const [articles, setArticles] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchArticlesByCategory = async (category, page) => {
    const { articles, totalPage, error } = await getArticles(
      category === "ALL" ? null : category,
      null,
      page ? page : 1
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

    if (!category || Object.keys(category).length === 0) return;

    if (category.path === "all") {
      setPaginateUrl("/all");
    } else {
      setPaginateUrl(`/archives/category/${category.path}`);
    }

    setCategory(category);
    fetchArticlesByCategory(category.name, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, category, page]);

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;

    await fetchArticlesByCategory(category.name, currentPage);
  };

  if (
    !category ||
    Object.keys(category).length === 0 ||
    !checkPage(page ? page : 1, totalPage)
  )
    return <NotFound />;

  const crumbs = [
    {
      name: "TOP",
      path: "/",
    },
    {
      name: slug ? slug.toUpperCase() : "ALL",
      path: false,
    },
  ];

  const TITLE = `${category.name.toUpperCase()} | Cygames Magazine | Cygames`;

  return (
    <Fragment>
      <Helmet>
        <title>{TITLE}</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className={cx("top", { mobile: isMobile })}>
        <div className={cx("wrapper", { mobile: isMobile })}>
          <Breadcrumb
            crumbs={crumbs}
            className={isMobile && "category--mobile"}
          />

          <div className={cx("title", { mobile: isMobile })}>
            <div className={cx("inner", { mobile: isMobile })}>
              <h2>{category?.name}</h2>
              {category?.description && <span>{category.description}</span>}
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
          {!loading ? (
            <Fragment>
              <ArticleList articles={articles} />
              <Pagination
                handlePageClick={handlePageClick}
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
