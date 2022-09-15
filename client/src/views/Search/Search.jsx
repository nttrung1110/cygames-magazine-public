import { Fragment, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

import Breadcrumb from "../../components/Content/Breadcrumb/Breadcrumb";
import TagList from "../../components/Content/TagList/TagList";
import Header from "../../components/Header/Header";
import ArticleList from "../../components/Content/ArticleList/ArticleList";
import RankList from "../../components/Content/RankList/RankList";
import LinkImage from "../../components/Content/LinkImage/LinkImage";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Content/Pagination/Pagination";
import NotFound from "../NotFound/NotFound";

import Link_Home_2 from "../../assets/common/Link_Home_2.png";

import { ArticleContext } from "../../contexts/ArticleContext";
import { TagContext } from "../../contexts/TagContext";

import "./Search.scss";

import { Helmet } from "react-helmet";

const Search = () => {
  const params = useParams();
  const search_param = new URLSearchParams(window.location.search).get("s");
  const currentPage = Number(params.currentPage) || 1;

  const navigate = useNavigate();

  const {
    articleState: {
      articles_search,
      articlesLoading,
      articles_rank,
      articlesRankLoading,
      pageCountFromServer,
    },
    getArticlesbySearchValue,
    getRankArticles,
    searchCount,
    resetLoading,
  } = useContext(ArticleContext);

  const {
    tagState: { tags, tagsLoading },
    getTags,
  } = useContext(TagContext);

  // Start: Get tags, search articles, rank articles
  useEffect(() => {
    getTags();
    getRankArticles();
    getArticlesbySearchValue(search_param, currentPage);
    if (currentPage === 1) {
      navigate(`/search/?s=${search_param}`);
    }
    resetLoading();
  }, [search_param, currentPage]);

  // BREADCRUMBS
  const crumbs = [
    {
      crumbName: "TOP",
      pathName: "/",
    },
    {
      crumbName: "SEARCH",
      pathName: false,
    },
    {
      crumbName: search_param,
      pathName: false,
    },
  ];

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    await getArticlesbySearchValue(search_param, currentPage);
  };

  let checkPage = null;
  if (
    (articles_search && articles_search.length === 0 && searchCount === 0) ||
    (currentPage > 0 &&
      currentPage % 1 === 0 &&
      currentPage <= pageCountFromServer)
  ) {
    checkPage = true;
  } else {
    checkPage = false;
  }

  let content__tags = null;
  if (tagsLoading) {
    content__tags = (
      <div className="spinner__border--container tags">
        <div className="spinner__border"></div>
      </div>
    );
  } else {
    content__tags = <TagList tags={tags.slice(0, 10)} />;
  }

  let content__articles__rank = null;
  if (articlesRankLoading) {
    content__articles__rank = (
      <div className="spinner__border--container articles__rank">
        <div className="spinner__border"></div>
      </div>
    );
  } else {
    content__articles__rank = <RankList articles={articles_rank} />;
  }

  let content__articles = null;
  if (articlesLoading) {
    content__articles = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  } else if (searchCount === 0) {
    content__articles = (
      <Fragment>
        <div className="search__result">
          <h2>
            Search Results:{" "}
            {articles_search && articles_search.length !== 0 ? searchCount : 0}
          </h2>
        </div>
        <p>No matching articles were found.</p>
      </Fragment>
    );
  } else if (articles_search && articles_search.length !== 0) {
    content__articles = (
      <Fragment>
        <div className="search__result">
          <h2>Search Results: {searchCount}</h2>
        </div>
        <ArticleList articles={articles_search} />
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={pageCountFromServer}
          currentPage={currentPage}
          url={"search"}
          search_param={search_param}
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
  const TITLE = `${search_param} | Cygames Magazine | Cygames`;

  return (
    <Fragment>
      {checkPage ? (
        <Fragment>
          <Helmet>
            <title>{TITLE}</title>
            <meta
              name="description"
              content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
            />
          </Helmet>

          <Header tags={tags} />
          <div
            className={`${
              !isMobile ? "wrapper search" : "wrapper--mobile search"
            }`}
          >
            <Breadcrumb crumbs={crumbs} />
          </div>
          <BrowserView className="wrapper__column search">
            <div className="container">
              <div className="left__column">{content__articles}</div>
              <div className="right__column">
                {content__tags}
                {content__articles__rank}
                <LinkImage data={Link_Home_2} url={"tech"} />
              </div>
            </div>
          </BrowserView>
          <MobileView className="main__column search">
            {content__articles}
            {content__tags}
            {content__articles__rank}
            <LinkImage data={Link_Home_2} url={"tech"} />
          </MobileView>
          <Footer />
        </Fragment>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default Search;
