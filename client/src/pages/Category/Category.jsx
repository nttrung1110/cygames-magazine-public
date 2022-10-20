import { Fragment, useEffect, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import ArticleList from "~/components/ArticleList/ArticleList";
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import LinkImage from "~/components/LinkImage/LinkImage";
import Navigation from "~/components/Navigation/Navigation";
import NotFound from "~/components/NotFound/NotFound";
import Pagination from "~/components/Pagination/Pagination";
import RankList from "~/components/RankList/RankList";
import TagList from "~/components/TagList/TagList";

import CATEGORY from "~/assets/category";
import images from "~/assets/images";

import checkPage from "~/utils/checkPage";

import { getArticles } from "~/api/article";

import "./Category.scss";

const Category = () => {
  const params = useParams();

  const { slug, page } = params;

  const [category, setCategory] = useState({});
  const [paginateUrl, setPaginateUrl] = useState("");
  const [articles, setArticles] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const fetchArticlesByCategory = async (category, page) => {
    const { articles, totalPage, error } = await getArticles(
      category === "ALL" ? null : category,
      null,
      page ? page : 1
    );

    if (error) return console.log(error);
    setArticles(articles);
    setTotalPage(totalPage);
  };

  useEffect(() => {
    const category = CATEGORY.find((category) => {
      return category.path === (slug ? slug : "all");
    });

    if (!category || Object.keys(category).length === 0) return;

    if (category.path === "all") {
      setPaginateUrl("/all");
    } else {
      setPaginateUrl(`/archives/category/${category.path}`);
    }

    setCategory(category);
    fetchArticlesByCategory(category.name, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, category, page]);

  // BREADCRUMBS
  const crumbs = [
    {
      name: "TOP",
      path: "/",
    },
    {
      name: slug ? slug.toUpperCase() : "ALL",
      path: false,
    },
  ];

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;

    await fetchArticlesByCategory(category.name, currentPage);
  };

  if (
    !category ||
    Object.keys(category).length === 0 ||
    !checkPage(page ? page : 1, totalPage)
  )
    return <NotFound />;

  // HELMET
  const TITLE = `${category.name.toUpperCase()} | Cygames Magazine | Cygames`;

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

      {!isMobile && slug && <Navigation />}

      <div
        className={`${
          !isMobile ? "wrapper category" : "wrapper--mobile category"
        }`}
      >
        <Breadcrumb crumbs={crumbs} />

        <div className="category__title">
          <div className="category__inner">
            <h2>{category?.name}</h2>
            {category?.description && <span>{category.description}</span>}
          </div>
        </div>

        <TagList limit={10} />
      </div>

      <BrowserView className="wrapper__column category">
        <div className="container">
          <div className="left__column">
            <ArticleList articles={articles} />
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={totalPage}
              currentPage={page ? page : 1}
              url={paginateUrl}
            />
          </div>
          <div className="right__column">
            <RankList />
            <LinkImage data={images.Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>

      <MobileView className="main__column category">
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

export default Category;
