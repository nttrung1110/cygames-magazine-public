import { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import Spinner from "../Spinner";
import RankContent from "./RankContent";

import { getArticlesRank } from "~/api/article";

import classNames from "classnames/bind";
import styles from "./RankList.module.scss";

const cx = classNames.bind(styles);

const RankList = ({ className }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticlesRank = async () => {
    const { articles, error } = await getArticlesRank();
    setLoading(false);

    if (error) return console.log(error);

    setArticles(articles);
  };

  useEffect(() => {
    fetchArticlesRank();
  }, []);

  return (
    <Fragment>
      <section className={cx("container", { mobile: isMobile }, className)}>
        <h2 className={cx("title")}>RANKING</h2>
        {!loading ? (
          <RankContent articles={articles} />
        ) : (
          <Spinner className={cx("rank")} />
        )}
      </section>
    </Fragment>
  );
};

export default RankList;
