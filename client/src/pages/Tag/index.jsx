import { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ArticleList from "~/components/ArticleList";
import Breadcrumb from "~/components/Breadcrumb";
import LinkImage from "~/components/LinkImage";
import NotFound from "~/components/NotFound";
import Pagination from "~/components/Pagination";
import RankList from "~/components/RankList";
import Spinner from "~/components/Spinner";
import TagList from "~/components/TagList";

import images from "~/assets/images";

import checkPage from "~/utils/checkPage";

import { getArticles } from "~/api/article";

import classNames from "classnames/bind";
import styles from "./Tag.module.scss";

const cx = classNames.bind(styles);

const Tag = () => {
  const { tags, loading } = useSelector((state) => state.tag);
  const params = useParams();

  const { slug, page } = params;

  const [tag, setTag] = useState({});
  const [paginateUrl, setPaginateUrl] = useState("");
  const [articles, setArticles] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const fetchArticlesByTag = async (tag, page) => {
    const { articles, totalPage, error } = await getArticles(
      null,
      tag,
      page ? page : 1
    );

    setLoadingArticles(false);

    if (error) return console.log(error);

    setArticles(articles);
    setTotalPage(totalPage);
  };

  useEffect(() => {
    const tag = tags.find((tag) => {
      return tag.slug === slug;
    });

    if (!loading) {
      if (!tag || Object.keys(tag).length === 0) return;

      setPaginateUrl(`/archives/tag/${tag.slug}`);
      setTag(tag);

      fetchArticlesByTag(tag.slug, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, slug, page]);

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;

    fetchArticlesByTag(slug, currentPage);
  };

  if (
    (!loading && !tag) ||
    (!loading && Object.keys(tag).length === 0) ||
    !checkPage(page ? page : 1, totalPage)
  )
    return <NotFound />;

  const crumbs = [
    {
      name: "TOP",
      path: "/",
    },
    {
      name: `#${slug}`,
      path: false,
    },
  ];

  const TITLE = `${
    tag && Object.keys(tag).length > 0 && `${tag.title}`
  } | Cygames Magazine | Cygames`;

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

      <div className={cx("container", { mobile: isMobile })}>
        <div className={cx("main", { mobile: isMobile })}>
          <Breadcrumb crumbs={crumbs} className={isMobile && "tag--mobile"} />

          <div className={cx("title", { mobile: isMobile })}>
            <h2>{tag.title}</h2>
          </div>

          {!loadingArticles ? (
            <Fragment>
              <ArticleList articles={articles} />

              <Pagination
                handlePageClick={handlePageClick}
                pageCount={totalPage}
                currentPage={page ? page : 1}
                url={paginateUrl}
                className={isMobile && "tag--mobile"}
              />
            </Fragment>
          ) : (
            <Spinner className={cx("tag")} />
          )}
        </div>

        <div className={cx("sub", { mobile: isMobile })}>
          <TagList
            limit={10}
            className={isMobile ? cx("tag--mobile") : cx("tag")}
          />

          <RankList className={!isMobile && cx("tag")} />

          <LinkImage
            image={images.Link_Home_2}
            url={"tech"}
            className={isMobile && cx("tag--mobile")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Tag;
