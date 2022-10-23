import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Breadcrumb from "~/components/Breadcrumb";
import LinkImage from "~/components/LinkImage";
import RankList from "~/components/RankList";
import Spinner from "~/components/Spinner";
import TagContent from "~/components/TagList/TagContent";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./TagList.module.scss";

const cx = classNames.bind(styles);

const TagList = () => {
  const { tags, loading } = useSelector((state) => state.tag);

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

  return (
    <Fragment>
      <Helmet>
        <title>tag_list | Cygames Magazine | Cygames</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className={cx("container", { mobile: isMobile })}>
        <div className={cx("main", { mobile: isMobile })}>
          <Breadcrumb
            crumbs={crumbs}
            className={isMobile && "tagList--mobile"}
          />

          <div className={cx("title", { mobile: isMobile })}>
            <h2>TAG LIST</h2>
          </div>

          {!loading ? (
            <TagContent tags={tags} className={isMobile && "tagList--mobile"} />
          ) : (
            <Spinner className={!isMobile && "tagList"} />
          )}
        </div>

        <div className={cx("sub", { mobile: isMobile })}>
          <RankList className={!isMobile && cx("tagList")} />

          <LinkImage
            image={images.Link_Home_2}
            url={"tech"}
            className={isMobile && cx("tagList--mobile")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default TagList;
