import { Fragment, useEffect, useContext } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { ArticleContext } from "../../contexts/ArticleContext";
import { TagContext } from "../../contexts/TagContext";

import Header from "../../components/Header/Header";
import Navigation from "../../components/Content/Navigation/Navigation";
import Slider from "../../components/Content/Slider/Slider";
import ArticleList from "../../components/Content/ArticleList/ArticleList";
import TagList from "../../components/Content/TagList/TagList";
import RankList from "../../components/Content/RankList/RankList";
import ViewMoreButton from "../../components/Content/ViewMoreButton/ViewMoreButton";
import Footer from "../../components/Footer/Footer";

import Link_Home_2 from "../../assets/common/Link_Home_2.png";
import metaImage from "../../assets/common/ogp.png";
import LinkImage from "../../components/Content/LinkImage/LinkImage";

import "./Home.scss";
import { Helmet } from "react-helmet";

const Home = () => {
  const {
    articleState: {
      articles,
      articles_rank,
      articlesRankLoading,
      articlesHomeLoading,
    },
    getArticles,
    getRankArticles,
    resetLoading,
  } = useContext(ArticleContext);

  const {
    tagState: { tags, tagsLoading },
    getTags,
  } = useContext(TagContext);

  // Start: Get tags, articles, rank articles
  useEffect(() => {
    getArticles();
    getRankArticles();
    getTags();
    resetLoading();
  }, []);

  // tags
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

  // rank articles
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

  // articles
  let content__articles = null;
  let content__slider = null;
  if (articlesHomeLoading) {
    content__slider = (
      <div className="spinner__border--container slider">
        <div className="spinner__border"></div>
      </div>
    );
    content__articles = (
      <div className="spinner__border--container articles">
        <div className="spinner__border"></div>
      </div>
    );
  } else {
    content__slider = <Slider articles={articles} />;
    content__articles = (
      <Fragment>
        <ArticleList articles={articles.slice(0, 10)} />
        <ViewMoreButton url={"/all"} />
      </Fragment>
    );
  }

  // HELMET
  const TITLE = `Cygames Magazine | Cygames`;

  return (
    <Fragment>
      <Helmet>
        <title>{TITLE}</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cygames Magazine | Cygames" />
        <meta
          property="og:image"
          content={`https://cygames-magazine.netlify.app${metaImage}`}
        />
        <meta
          property="og:description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />

        {/* <!-- Twitter Meta Tags --/> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CygamesMagazine" />
        <meta name="twitter:domain" content="cygames-magazine.netlify.app" />
        <meta name="twitter:title" content="Cygames Magazine | Cygames" />
        <meta
          name="twitter:description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />

        <meta
          name="twitter:image"
          content={`https://cygames-magazine.netlify.app${metaImage}`}
        />
      </Helmet>

      <Header tags={tags} />
      <Navigation />

      <BrowserView className="wrapper__column">
        {content__slider}
        <div className="container">
          <div className="left__column">{content__articles}</div>
          <div className="right__column">
            {content__tags}
            {content__articles__rank}
            <LinkImage data={Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>

      <MobileView className="main__column">
        <h2 className="new__title">LATEST</h2>
        {content__articles}

        {content__tags}
        {content__articles__rank}
        <LinkImage data={Link_Home_2} url={"tech"} />
      </MobileView>

      <Footer />
    </Fragment>
  );
};

export default Home;
