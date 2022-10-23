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

import { searchArticle } from "~/api/article";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

const Search = () => {
  const params = useParams();

  const searchKeyword = new URLSearchParams(window.location.search).get("s");
  const { page } = params;

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [totalPage, setTotalPage] = useState(999);

  const fetchArticlesBySearchValue = async (page = 1) => {
    setLoading(true);

    const { articles, articlesCount, totalPage, error } = await searchArticle(
      searchKeyword,
      page
    );

    setLoading(false);

    if (error) return console.log(error);

    setArticles(articles);
    setArticlesCount(articlesCount);
    setTotalPage(totalPage);
  };

  useEffect(() => {
    fetchArticlesBySearchValue(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const handlePageChange = async (data) => {
    const currentPage = data.selected + 1;

    await fetchArticlesBySearchValue(currentPage);
  };

  if (searchKeyword === null) return <NotFound />;

  let articlesList = null;

  if (loading) {
    articlesList = <Spinner className={cx("search--mobile")} />;
  } else if (totalPage === 0) {
    articlesList = (
      <div className={cx("result", { mobile: isMobile })}>
        <h2>Search Results: 0</h2>
        <p>No matching articles were found.</p>
      </div>
    );
  } else if (articlesCount !== 0) {
    articlesList = (
      <Fragment>
        <div className={cx("result", { mobile: isMobile })}>
          <h2>Search Results: {articlesCount}</h2>
        </div>
        <ArticleList articles={articles} />
        <Pagination
          searchKeyword={searchKeyword}
          currentPage={page ? page : 1}
          pageCount={totalPage}
          handlePageChange={handlePageChange}
          url={"search"}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          {`${searchKeyword ? searchKeyword + " | " : ""}`}Cygames Magazine |
          Cygames
        </title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
      </Helmet>

      <div className={cx("container", { mobile: isMobile })}>
        <div className={cx("main", { mobile: isMobile })}>
          <Breadcrumb
            data={[
              {
                name: "SEARCH",
                path: false,
              },
              {
                name: searchKeyword,
                path: false,
              },
            ]}
            className={isMobile && "search--mobile"}
          />

          {articlesList}
        </div>

        <div className={cx("sub", { mobile: isMobile })}>
          <TagList
            limit={10}
            className={isMobile ? cx("search--mobile") : cx("search")}
          />

          <RankList className={!isMobile && cx("search")} />

          <LinkImage
            image={images.Link_Home_2}
            url={"tech"}
            className={isMobile && cx("search--mobile")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
