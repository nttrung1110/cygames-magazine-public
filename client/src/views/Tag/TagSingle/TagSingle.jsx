import { Fragment, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

import { TagContext } from "../../../contexts/TagContext";
import { ArticleContext } from "../../../contexts/ArticleContext";

import Breadcrumb from "../../../components/Content/Breadcrumb/Breadcrumb";
import ArticleList from "../../../components/Content/ArticleList/ArticleList";
import Pagination from "../../../components/Content/Pagination/Pagination";
import Header from "../../../components/Header/Header";
import TagList from "../../../components/Content/TagList/TagList";
import RankList from "../../../components/Content/RankList/RankList";
import LinkImage from "../../../components/Content/LinkImage/LinkImage";
import Navigation from "../../../components/Content/Navigation/Navigation";
import Footer from "../../../components/Footer/Footer";
import NotFound from "../../NotFound/NotFound";

import Link_Home_2 from "../../../assets/common/Link_Home_2.png";

import "./TagSingle.scss";

import { Helmet } from "react-helmet";

const Tag_Single = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tag_param = params.tag_name;
  const currentPage = Number(params.currentPage) ? params.currentPage : 1;

  // Tags
  const {
    tagState: { tags, tagsLoading },
    getTags,
  } = useContext(TagContext);

  const tag =
    tags.length > 0 ? tags.find((tag) => tag.url_name === tag_param) : {};

  // Articles
  const {
    articleState: {
      articles_tag,
      articlesLoading,
      articles_rank,
      articlesRankLoading,
      pageCountFromServer,
    },
    getArticlesbyTag,
    getRankArticles,
    resetLoading,
  } = useContext(ArticleContext);

  // Start: Get tags, articles with tag, rank articles
  useEffect(() => {
    getTags();
    getRankArticles();
    getArticlesbyTag(tag_param, currentPage);
    if (currentPage === "1") {
      navigate(`/archives/tag/${tag_param}`);
    }
    resetLoading();
  }, [tag_param, currentPage]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    await getArticlesbyTag(tag_param, currentPage);
  };

  let checkPage = null;

  if (
    currentPage > 0 &&
    currentPage <= pageCountFromServer &&
    currentPage % 1 === 0 &&
    tag
  ) {
    checkPage = true;
  } else {
    checkPage = false;
  }

  const crumbs = [
    {
      crumbName: "TOP",
      pathName: "/",
    },
    {
      crumbName: `${tag && Object.keys(tag).length > 0 ? `#${tag.title}` : ""}`,
      pathName: false,
    },
  ];

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
  if (articlesLoading || (articles_tag && articles_tag.length === 0)) {
    content__articles = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  } else if (articles_tag && articles_tag.length !== 0) {
    content__articles = (
      <Fragment>
        <ArticleList articles={articles_tag} />
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={pageCountFromServer}
          currentPage={currentPage}
          url={`/archives/tag/${tag_param}`}
        />
      </Fragment>
    );
  }

  // HELMET
  const TITLE = `${
    tag && Object.keys(tag).length > 0 && `${tag.title}`
  } | Cygames Magazine | Cygames`;

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
            <meta name="robots" content="noindex,follow" />
          </Helmet>

          <Header tags={tags} />
          {!isMobile && <Navigation />}
          <div
            className={`${!isMobile ? "wrapper tag" : "wrapper--mobile tag"}`}
          >
            <Breadcrumb crumbs={crumbs} />
          </div>
          <BrowserView className="wrapper__column tag_single">
            <div className="container">
              <div className="left__column">
                <section className="tag__container">
                  {Object.keys(tag).length > 0 && (
                    <h2 className="tag__title">{tag.title}</h2>
                  )}
                </section>
                {content__articles}
              </div>
              <div className="right__column">
                {content__tags}
                {content__articles__rank}
                <LinkImage data={Link_Home_2} url={"tech"} />
              </div>
            </div>
          </BrowserView>
          <MobileView className="main__column tag_single">
            <section className="tag__container">
              {Object.keys(tag).length > 0 && (
                <h2 className="tag__title">{tag.title}</h2>
              )}
            </section>
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

export default Tag_Single;
