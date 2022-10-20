import { Fragment, useEffect, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import TagList from "~/components/TagList/TagList";
import ArticleList from "~/components/ArticleList/ArticleList";
import RankList from "~/components/RankList/RankList";
import LinkImage from "~/components/LinkImage/LinkImage";
import Pagination from "~/components/Pagination/Pagination";

import { searchArticle } from "~/api/article";

import images from "~/assets/images";

import "./Search.scss";

const Search = () => {
  const params = useParams();

  const searchKeyword = new URLSearchParams(window.location.search).get("s");
  const { page } = params;

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchArticlesBySearchValue = async (page) => {
    const { articles, articlesCount, totalPage, error } = await searchArticle(
      searchKeyword,
      page ? page : 1
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
  }, []);

  // BREADCRUMBS
  const crumbs = [
    {
      name: "TOP",
      path: "/",
    },
    {
      name: "SEARCH",
      path: false,
    },
    {
      name: searchKeyword,
      path: false,
    },
  ];

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;

    await fetchArticlesBySearchValue(currentPage);
  };

  let content__articles = null;
  if (loading) {
    content__articles = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  } else if (articlesCount === 0) {
    content__articles = (
      <Fragment>
        <div className="search__result">
          <h2>
            Search Results:{" "}
            {articles && articles.length !== 0 ? articlesCount : 0}
          </h2>
        </div>
        <p>No matching articles were found.</p>
      </Fragment>
    );
  } else if (articles && articles.length !== 0) {
    content__articles = (
      <Fragment>
        <div className="search__result">
          <h2>Search Results: {articlesCount}</h2>
        </div>
        <ArticleList articles={articles} />
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={totalPage}
          currentPage={page ? page : 1}
          url={"search"}
          search_param={searchKeyword}
        />
      </Fragment>
    );
  } else {
    content__articles = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  }

  // HELMET
  const TITLE = `${searchKeyword} | Cygames Magazine | Cygames`;

  return (
    <Fragment>
      <Helmet>
        <title>{TITLE}</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
      </Helmet>

      <div
        className={`${!isMobile ? "wrapper search" : "wrapper--mobile search"}`}
      >
        <Breadcrumb crumbs={crumbs} />
      </div>
      <BrowserView className="wrapper__column search">
        <div className="container">
          <div className="left__column">{content__articles}</div>
          <div className="right__column">
            <TagList limit={10} />
            <RankList />
            <LinkImage data={images.Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>
      <MobileView className="main__column search">
        {content__articles}
        <TagList limit={10} />
        <RankList />
        <LinkImage data={images.Link_Home_2} url={"tech"} />
      </MobileView>
    </Fragment>
  );
};

export default Search;
