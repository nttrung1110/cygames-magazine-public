import React, { Fragment, useContext, useEffect } from "react";
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import Breadcrumb from "../../../components/Content/Breadcrumb/Breadcrumb";
import TagList from "../../../components/Content/TagList/TagsContent/TagsContent";
import Header from "../../../components/Header/Header";
import RankList from "../../../components/Content/RankList/RankList";
import LinkImage from "../../../components/Content/LinkImage/LinkImage";
import Footer from "../../../components/Footer/Footer";

import Link_Home_2 from "../../../assets/common/Link_Home_2.png";

import { TagContext } from "../../../contexts/TagContext";
import { ArticleContext } from "../../../contexts/ArticleContext";

import "./TagAll.scss";

import { Helmet } from "react-helmet";

const Tag_All = () => {
  const {
    articleState: { articles_rank, articlesRankLoading },
    getRankArticles,
    resetLoading,
  } = useContext(ArticleContext);

  const {
    tagState: { tags, tagsLoading },
    getTags,
  } = useContext(TagContext);

  // Start: Get tags, rank articles
  useEffect(() => {
    getTags();
    getRankArticles();
    resetLoading();
  }, []);

  // BREADCRUMBS
  const crumbs = [
    {
      crumbName: "TOP",
      pathName: "/",
    },
    {
      crumbName: "TAG LIST",
      pathName: false,
    },
  ];

  let content__tags = null;
  if (tagsLoading) {
    content__tags = (
      <div className="spinner__border--container tagsList">
        <div className="spinner__border"></div>
      </div>
    );
  } else {
    content__tags = <TagList tags={tags} />;
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

  // HELMET
  const TITLE = `tag_list | Cygames Magazine | Cygames`;

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

      <Header tags={tags} />
      <div className={`${!isMobile ? "wrapper tag" : "wrapper--mobile tag"}`}>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <BrowserView className="wrapper__column tag_all">
        <div className="container">
          <div className="left__column">
            <section className="tags__list">
              <h2 className="tags__title">TAG LIST</h2>
            </section>
            {content__tags}
          </div>
          <div className="right__column">
            {content__articles__rank}
            <LinkImage data={Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>
      <MobileView className="main__column tag_all">
        <section className="tags__list">
          <h2 className="tags__title">TAG LIST</h2>
        </section>
        {content__tags}
        {content__articles__rank}
        <LinkImage data={Link_Home_2} url={"tech"} />
      </MobileView>
      <Footer />
    </Fragment>
  );
};

export default Tag_All;
