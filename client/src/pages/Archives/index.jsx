import parse from "html-react-parser";
import { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Breadcrumb from "~/components/Breadcrumb";
import LinkImage from "~/components/LinkImage";
import NotFound from "~/components/NotFound";
import RankList from "~/components/RankList";
import Spinner from "~/components/Spinner";
import TagList from "~/components/TagList";
import ArticleHeader from "./components/ArticleHeader";
import NavShare from "./components/NavShare";
import RelatedArticles from "./components/RelatedArticles";

import images from "~/assets/images";

import { getArticle } from "~/api/article";

import classNames from "classnames/bind";
import styles from "./Archives.module.scss";
import ArticleFooter from "./components/ArticleFooter";

import "./ArticleBody.scss";

const cx = classNames.bind(styles);

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

  let content__article = null;
  let crumbs = [];

  if (loading) {
    content__article = <Spinner />;
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
      <article className={cx(isMobile && "content")}>
        <ArticleHeader article={article} />

        <div className={`article-body ${isMobile ? "mobile" : ""}`}>
          {parse(article.content)}
        </div>

        <ArticleFooter
          article={article}
          prevArticle={prevArticle}
          nextArticle={nextArticle}
        />
      </article>
    );
  }

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

      <div className={cx("container", { mobile: isMobile })}>
        <div className={cx("main", { mobile: isMobile })}>
          <Breadcrumb crumbs={crumbs} className={isMobile && "tag--mobile"} />

          {content__article}

          {relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
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

      <NavShare article={article} />
    </Fragment>
  );
};

export default Archives;
