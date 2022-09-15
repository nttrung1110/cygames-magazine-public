import { Fragment, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

import { LayoutContext } from "../../contexts/LayoutContext";
import { ArticleContext } from "../../contexts/ArticleContext";
import { TagContext } from "../../contexts/TagContext";

import Navigation from "../../components/Content/Navigation/Navigation";
import Breadcrumb from "../../components/Content/Breadcrumb/Breadcrumb";
import TagList from "../../components/Content/TagList/TagList";
import Header from "../../components/Header/Header";

import Link_Home_2 from "../../assets/common/Link_Home_2.png";

import ArticleList from "../../components/Content/ArticleList/ArticleList";
import RankList from "../../components/Content/RankList/RankList";
import LinkImage from "../../components/Content/LinkImage/LinkImage";
import Footer from "../../components/Footer/Footer";

import Pagination from "../../components/Content/Pagination/Pagination";
import NotFound from "../NotFound/NotFound";

import "./Category.scss";

import { Helmet } from "react-helmet";

const Category = () => {
  const params = useParams();
  const category_param = params.category_name ? params.category_name : "all";
  const currentPage = Number(params.currentPage) || 1;

  const navigate = useNavigate();

  let url = null;
  if (category_param === "all") {
    url = `/all`;
  } else {
    url = `/archives/category/${category_param}`;
  }

  const { categoryData } = useContext(LayoutContext);

  const {
    articleState: {
      articles_category,
      articlesLoading,
      articles_rank,
      articlesRankLoading,
      pageCountFromServer,
    },
    getArticlesbyCategory,
    getRankArticles,
    resetLoading,
  } = useContext(ArticleContext);

  const {
    tagState: { tags, tagsLoading },
    getTags,
  } = useContext(TagContext);

  // Start: Get tags, articles_category, rannk articles
  useEffect(() => {
    getArticlesbyCategory(category_param, currentPage);
    getRankArticles();
    getTags();
    if (currentPage === 1 && category_param === "all") {
      navigate(`/all`);
    } else if (currentPage === 1) {
      navigate(`/archives/category/${category_param}`);
    }
    resetLoading();
  }, [category_param, currentPage]);

  // CATEGORY
  const category = categoryData.filter((category) => {
    return category.pathName === category_param;
  });

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    await getArticlesbyCategory(category_param, currentPage);
  };

  // BREADCRUMBS
  const crumbs = [
    {
      crumbName: "TOP",
      pathName: "/",
    },
    {
      crumbName: category_param.toUpperCase(),
      pathName: false,
    },
  ];

  let checkPage = null;
  if (
    currentPage > 0 &&
    currentPage <= pageCountFromServer &&
    currentPage % 1 === 0 &&
    category.length !== 0
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
  if (
    articlesLoading ||
    (articles_category && articles_category.length === 0)
  ) {
    content__articles = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  } else if (articles_category && articles_category.length !== 0) {
    content__articles = (
      <Fragment>
        <ArticleList articles={articles_category} />
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={pageCountFromServer}
          currentPage={currentPage}
          url={url}
        />
      </Fragment>
    );
  }

  // HELMET
  const TITLE = `${category_param.toUpperCase()} | Cygames Magazine | Cygames`;

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
            className={`${
              !isMobile ? "wrapper category" : "wrapper--mobile category"
            }`}
          >
            <Breadcrumb crumbs={crumbs} />
            <div className="category__title">
              <div className="category__inner">
                <h2>{category[0].categoryName}</h2>
                {category[0].categoryDes && (
                  <span>{category[0].categoryDes}</span>
                )}
              </div>
            </div>
            {content__tags}
          </div>
          <BrowserView className="wrapper__column category">
            <div className="container">
              <div className="left__column">{content__articles}</div>
              <div className="right__column">
                {content__articles__rank}
                <LinkImage data={Link_Home_2} url={"tech"} />
              </div>
            </div>
          </BrowserView>
          <MobileView className="main__column category">
            {content__articles}
            {content__articles__rank}
            <LinkImage data={Link_Home_2} url={"tech"} />
          </MobileView>
          <Footer />
        </Fragment>
      ) : (
        <NotFound
          title={`Archives Category ${
            category_param.charAt(0).toUpperCase() + category_param.slice(1)
          }`}
        />
      )}
    </Fragment>
  );
};

export default Category;
