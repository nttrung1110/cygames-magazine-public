import { Fragment } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { useSelector } from "react-redux";

import Breadcrumb from "~/components/Breadcrumb/Breadcrumb";
import LinkImage from "~/components/LinkImage/LinkImage";
import RankList from "~/components/RankList/RankList";
import TagsContent from "~/components/TagList/TagsContent/TagsContent";

import images from "~/assets/images";

import "./TagAll.scss";

import { Helmet } from "react-helmet";

const TagAll = () => {
  const { tags } = useSelector((state) => state.tag);

  // BREADCRUMBS
  const crumbs = [
    {
      name: "TOP",
      path: "/",
    },
    {
      name: "TAG LIST",
      path: false,
    },
  ];

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

      <div className={`${!isMobile ? "wrapper tag" : "wrapper--mobile tag"}`}>
        <Breadcrumb crumbs={crumbs} />
      </div>
      <BrowserView className="wrapper__column tag_all">
        <div className="container">
          <div className="left__column">
            <section className="tags__list">
              <h2 className="tags__title">TAG LIST</h2>
            </section>
            <TagsContent tags={tags} />
          </div>
          <div className="right__column">
            <RankList />
            <LinkImage data={images.Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>
      <MobileView className="main__column tag_all">
        <section className="tags__list">
          <h2 className="tags__title">TAG LIST</h2>
        </section>
        <TagsContent tags={tags} />
        <RankList />
        <LinkImage data={images.Link_Home_2} url={"tech"} />
      </MobileView>
    </Fragment>
  );
};

export default TagAll;
