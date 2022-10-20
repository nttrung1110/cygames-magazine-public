import { Fragment, useEffect, useState } from "react";

import RankContent from "./RankContent/RankContent";

import { getArticlesRank } from "~/api/article";

import "./RankList.scss";

const RankList = () => {
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
      {!loading ? (
        <section className="rank__list">
          <h2 className="ranking__title">RANKING</h2>
          <RankContent articles={articles} />
        </section>
      ) : (
        <div className="spinner__border--container articles__rank">
          <div className="spinner__border"></div>
        </div>
      )}
    </Fragment>
  );
};

export default RankList;
