import { Fragment, useEffect, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ArticleList from "~/components/ArticleList/ArticleList";
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import LinkImage from "~/components/LinkImage/LinkImage";
import Navigation from "~/components/Navigation/Navigation";
import NotFound from "~/components/NotFound/NotFound";
import Pagination from "~/components/Pagination/Pagination";
import RankList from "~/components/RankList/RankList";
import TagList from "~/components/TagList/TagList";

import images from "~/assets/images";

import { getArticles } from "~/api/article";

import "./TagSingle.scss";

const Tag_Single = () => {
  const { tags, loading } = useSelector((state) => state.tag);
  const params = useParams();

  const { slug, page } = params;

  const [tag, setTag] = useState({});
  const [paginateUrl, setPaginateUrl] = useState("");
  const [articles, setArticles] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const fetchArticlesByTag = async (tag, page) => {
    const { articles, totalPage, error } = await getArticles(
      null,
      tag,
      page ? page : 1
    );

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

  // BREADCRUMBS
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

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;

    fetchArticlesByTag(slug, currentPage);
  };

  if ((!loading && !tag) || (!loading && Object.keys(tag).length === 0))
    return <NotFound />;

  // HELMET
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

      {!isMobile && <Navigation />}
      <div className={`${!isMobile ? "wrapper tag" : "wrapper--mobile tag"}`}>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <BrowserView className="wrapper__column tag_single">
        <div className="container">
          <div className="left__column">
            <section className="tag__container">
              <h2 className="tag__title">{tag.title}</h2>
            </section>
            <ArticleList articles={articles} />
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={totalPage}
              currentPage={page ? page : 1}
              url={paginateUrl}
            />
          </div>
          <div className="right__column">
            <TagList limit={10} />
            <RankList />
            <LinkImage data={images.Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>
      <MobileView className="main__column tag_single">
        <section className="tag__container">
          <h2 className="tag__title">{tag.title}</h2>
        </section>
        <ArticleList articles={articles} />
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={totalPage}
          currentPage={page ? page : 1}
          url={paginateUrl}
        />
        <RankList />
        <LinkImage data={images.Link_Home_2} url={"tech"} />
      </MobileView>
    </Fragment>
  );
};

export default Tag_Single;
