import { Fragment } from "react";
import { isMobile } from "react-device-detect";

import { useSelector } from "react-redux";

import Spinner from "../Spinner";
import RankContent from "./RankContent";

import classNames from "classnames/bind";
import styles from "./RankList.module.scss";

const cx = classNames.bind(styles);

const RankList = ({ className }) => {
  const { articlesRank, loadingArticlesRank } = useSelector(
    (state) => state.article
  );

  return (
    <Fragment>
      <section className={cx("container", { mobile: isMobile }, className)}>
        <h2 className={cx("title")}>RANKING</h2>
        {!loadingArticlesRank ? (
          <RankContent articles={articlesRank} />
        ) : (
          <Spinner className={cx("rank")} />
        )}
      </section>
    </Fragment>
  );
};

export default RankList;
