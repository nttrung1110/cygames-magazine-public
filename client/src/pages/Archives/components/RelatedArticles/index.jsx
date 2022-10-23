import ArticleList from "~/components/ArticleList";

import classNames from "classnames/bind";
import styles from "./RelatedArticles.module.scss";

const cx = classNames.bind(styles);

const RelatedArticles = ({ articles }) => {
  return (
    <section className={cx("container")}>
      <h2 className={cx("title")}>RECOMMENDS</h2>

      <ArticleList articles={articles} />
    </section>
  );
};

export default RelatedArticles;
