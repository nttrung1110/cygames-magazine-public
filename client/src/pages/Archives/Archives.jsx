import { Fragment, useEffect, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { Helmet } from "react-helmet";
import ReactHtmlParser from "react-html-parser";
import { Link, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import ArticleList from "~/components/ArticleList/ArticleList";
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import LinkImage from "~/components/LinkImage/LinkImage";
import NotFound from "~/components/NotFound/NotFound";
import RankList from "~/components/RankList/RankList";
import TagList from "~/components/TagList/TagList";
import TagsContent from "~/components/TagList/TagsContent/TagsContent";

import images from "~/assets/images";

import formatTime from "~/utils/formatTime";

import { getArticle } from "~/api/article";

import "./Archives.scss";

const Archives = () => {
  const params = useParams();

  const { slug } = params;

  const [article, setArticle] = useState({});
  const [prevArticle, setPrevArticle] = useState({});
  const [nextArticle, setNextArticle] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchArticle = async () => {
    const { article, relatedArticles, prevArticle, nextArticle, error } =
      await getArticle(slug);
    setloading(false);

    if (error) return console.log(error);

    setArticle(article);
    setRelatedArticles(relatedArticles);
    setPrevArticle(prevArticle);
    setNextArticle(nextArticle);
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const [scrollDir, setScrollDir] = useState("down");

  // Animation for share(twitter, fb,...) article
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

  let content__article = null;
  let crumbs = [];

  if (loading) {
    content__article = (
      <div className="spinner__border--container">
        <div className="spinner__border"></div>
      </div>
    );
  } else if (article !== null && Object.keys(article).length > 0) {
    crumbs = [
      {
        name: "TOP",
        path: "/",
      },
      {
        name: `${article.category || ""}`,
        path: `/archives/category/${article.category.toLowerCase() || ""}`,
      },
      {
        name: `${article.title || ""}`,
        path: false,
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
                {nextArticle && (
                  <Link to={`/archives/${nextArticle.slug}`}>
                    <div className="article__prev">
                      <span>PREV</span>
                    </div>
                    <p>{nextArticle.title}</p>
                  </Link>
                )}
              </li>
              <li>
                {prevArticle && (
                  <Link to={`/archives/${prevArticle.slug}`}>
                    <div className="article__next">
                      <span>NEXT</span>
                    </div>
                    <p>{prevArticle.title}</p>
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
              <Link to={`/`}>
                <span>BACK TO TOP</span>
              </Link>
            </div>
          </footer>
        </article>
        {relatedArticles.length > 0 && (
          <section className="article__recommends">
            <h2 className="article__recommends--title">RECOMMENDS</h2>
            <ArticleList articles={relatedArticles} />
          </section>
        )}
      </Fragment>
    );
  }

  // HELMET
  const TITLE = `${
    article !== null && Object.keys(article).length > 0
      ? article.title + " |"
      : ""
  }  Cygames Magazine | Cygames`;

  if ((!loading && !article) || (!loading && Object.keys(article).length === 0))
    return <NotFound />;

  return (
    <Fragment>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={article.meta_description} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.meta} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.meta}.png`}
        />
        <meta property="og:description" content={article.meta_description} />

        {/* <!-- Twitter Meta Tags --/> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CygamesMagazine" />
        <meta name="twitter:domain" content="cygames-magazine.netlify.app" />
        <meta
          name="twitter:title"
          content={`${article.meta} | Cygames Magazine | Cygames`}
        />
        <meta name="twitter:description" content={article.meta_description} />

        <meta
          name="twitter:image"
          content={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.meta}.png`}
        />
      </Helmet>

      <div className={`${!isMobile ? "wrapper tag" : "wrapper--mobile tag"}`}>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <BrowserView className="wrapper__column article">
        <div className="container">
          <div className="left__column">{content__article}</div>
          <div className="right__column">
            <TagList limit={10} />
            <RankList />
            <LinkImage data={images.Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>
      <MobileView className="main__column article">
        {content__article}
        <TagList limit={10} />
        <RankList />
        <LinkImage data={images.Link_Home_2} url={"tech"} />
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
              title={`${article.meta} | Cygames Magazine | Cygames`}
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
    </Fragment>
  );
};

export default Archives;
