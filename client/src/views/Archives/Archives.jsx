import { Fragment, useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

import { ArticleContext } from "../../contexts/ArticleContext";
import { TagContext } from "../../contexts/TagContext";
import { LayoutContext } from "../../contexts/LayoutContext";

import Breadcrumb from "../../components/Content/Breadcrumb/Breadcrumb";
import TagList from "../../components/Content/TagList/TagList";
import TagsContent from "../../components/Content/TagList/TagsContent/TagsContent";
import RankList from "../../components/Content/RankList/RankList";
import ArticleList from "../../components/Content/ArticleList/ArticleList";
import LinkImage from "../../components/Content/LinkImage/LinkImage";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NotFound from "../NotFound/NotFound";

import Link_Home_2 from "../../assets/common/Link_Home_2.png";

import "./Archives.scss";

import ReactHtmlParser from "react-html-parser";

import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const Archives = () => {
  const params = useParams();
  const article_id = params.article_id;
  const { handleLinkChange } = useContext(LayoutContext);

  // Tags
  const {
    tagState: { tags, tagsLoading },
    getTags,
  } = useContext(TagContext);

  // Articles
  const {
    articleState: {
      article,
      next_article,
      prev_article,
      relate_articles,
      articlesLoading,
      articles_rank,
      articlesRankLoading,
    },
    getArticlebyId,
    getRankArticles,
    resetLoading,
  } = useContext(ArticleContext);

  // Start: Get all tags, articles with tag, rank articles
  useEffect(() => {
    resetLoading();
    getTags();
    getRankArticles();
    getArticlebyId(article_id);
  }, [article_id]);

  const { formatTime } = useContext(LayoutContext);

  let checkPage = null;
  if (article) {
    checkPage = true;
  } else {
    checkPage = false;
  }

  let crumbs = [];
  let content__article = null;
  if (articlesLoading) {
    content__article = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  } else if (article !== null && Object.keys(article).length > 0) {
    crumbs = [
      {
        crumbName: "TOP",
        pathName: "/",
      },
      {
        crumbName: `${article.category || ""}`,
        pathName: `/archives/category/${article.category.toLowerCase() || ""}`,
      },
      {
        crumbName: `${article.title || ""}`,
        pathName: false,
      },
    ];

    content__article = (
      <Fragment>
        <article>
          <header className="article__header">
            <div className="article__header--label">{article.category}</div>
            <time className="article__header--date">
              {formatTime(article.createdAt)}
            </time>
          </header>
          {ReactHtmlParser(article.content)}
          <footer className="article__footer">
            <TagsContent tags={article.tags} />
            <ul className="article__relative">
              <li>
                {next_article && (
                  <Link
                    to={`/archives/${next_article.url_name}`}
                    onClick={handleLinkChange}
                  >
                    <div className="article__prev">
                      <span>PREV</span>
                    </div>
                    <p>{next_article.title}</p>
                  </Link>
                )}
              </li>
              <li>
                {prev_article && (
                  <Link
                    to={`/archives/${prev_article.url_name}`}
                    onClick={handleLinkChange}
                  >
                    <div className="article__next">
                      <span>NEXT</span>
                    </div>
                    <p>{prev_article.title}</p>
                  </Link>
                )}
              </li>
            </ul>
            <div className="article__share">
              <FacebookShareButton url={window.location.href}>
                <div className="share__button facebook__share">
                  <FacebookIcon size={20} round={false} />
                  <span>Share</span>
                </div>
              </FacebookShareButton>
              <TwitterShareButton
                title={`${article.meta_title} | Cygames Magazine | Cygames`}
                url={window.location.href}
                hashtags={[`CygamesMagazine`]}
              >
                <div className="share__button twitter__share">
                  <TwitterIcon size={20} round={false} />
                  <span>Tweet</span>
                </div>
              </TwitterShareButton>
            </div>
            <div className="back__button">
              <Link to={`/`} onClick={handleLinkChange}>
                <span>BACK TO TOP</span>
              </Link>
            </div>
          </footer>
        </article>
        {relate_articles.length > 0 && (
          <section className="article__recommends">
            <h2 className="article__recommends--title">RECOMMENDS</h2>
            <ArticleList articles={relate_articles} />
          </section>
        )}
      </Fragment>
    );
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

  // HELMET
  const TITLE = `${
    article !== null && Object.keys(article).length > 0
      ? article.title + " |"
      : ""
  }  Cygames Magazine | Cygames`;

  // Nav share article

  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <Fragment>
      {checkPage ? (
        <Fragment>
          <Helmet>
            <title>{TITLE}</title>
            <meta name="description" content={article.meta_description} />
            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={article.meta_title} />
            <meta
              property="og:image"
              content={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.meta_image}.png`}
            />
            <meta
              property="og:description"
              content={article.meta_description}
            />

            {/* <!-- Twitter Meta Tags --/> */}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@CygamesMagazine" />
            <meta
              name="twitter:domain"
              content="cygames-magazine.netlify.app"
            />
            <meta
              name="twitter:title"
              content={`${article.meta_title} | Cygames Magazine | Cygames`}
            />
            <meta
              name="twitter:description"
              content={article.meta_description}
            />

            <meta
              name="twitter:image"
              content={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.meta_image}.png`}
            />
          </Helmet>

          <Header tags={tags} />
          <div
            className={`${!isMobile ? "wrapper tag" : "wrapper--mobile tag"}`}
          >
            <Breadcrumb crumbs={crumbs} />
          </div>
          <BrowserView className="wrapper__column article">
            <div className="container">
              <div className="left__column">{content__article}</div>
              <div className="right__column">
                {content__tags}
                {content__articles__rank}
                <LinkImage data={Link_Home_2} url={"tech"} />
              </div>
            </div>
          </BrowserView>
          <MobileView className="main__column article">
            {content__article}
            {content__tags}
            {content__articles__rank}
            <LinkImage data={Link_Home_2} url={"tech"} />
          </MobileView>
          <div
            className={`nav__share--button ${
              scrollDir === "up" ? `is--scroll-up` : ""
            }`}
          >
            <span>SHARE</span>
            <ul>
              <li>
                <FacebookShareButton url={window.location.href}>
                  <div className="share__button">
                    <FacebookIcon size={36} round />
                  </div>
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton
                  title={`${article.meta_title} | Cygames Magazine | Cygames`}
                  url={window.location.href}
                  hashtags={[`CygamesMagazine`]}
                >
                  <div className="share__button">
                    <TwitterIcon size={36} round />
                  </div>
                </TwitterShareButton>
              </li>
            </ul>
          </div>
          <Footer />
        </Fragment>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default Archives;
