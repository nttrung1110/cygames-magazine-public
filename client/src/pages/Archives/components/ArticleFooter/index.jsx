import { isMobile } from "react-device-detect";

import NavigationButton from "~/components/NavigationButton";
import TagsContent from "~/components/TagList/TagContent";
import ArticleRelative from "../ArticleRelative";
import ArticleShare from "../ArticleShare";

import classNames from "classnames/bind";
import styles from "./ArticleFooter.module.scss";

const cx = classNames.bind(styles);

const ArticleFooter = ({ article, prevArticle, nextArticle }) => {
  return (
    <footer className="article__footer">
      <TagsContent
        tags={article.tags}
        className={isMobile ? cx("archives--mobile") : cx("archives")}
      />

      <ArticleRelative prevArticle={prevArticle} nextArticle={nextArticle} />

      <ArticleShare article={article} />

      <NavigationButton
        text={"BACK TO TOP"}
        url={"/"}
        direction="left"
        className={isMobile ? cx("archives--mobile") : cx("archives")}
      />
    </footer>
  );
};

export default ArticleFooter;
