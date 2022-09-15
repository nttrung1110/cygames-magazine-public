import RankContent from "./RankContent/RankContent";

import "./RankList.scss";

const RankList = (props) => {
  const articles = props.articles;

  return (
    <section className="rank__list">
      <h2 className="ranking__title">RANKING</h2>
      <RankContent articles={articles} />
    </section>
  );
};

export default RankList;
