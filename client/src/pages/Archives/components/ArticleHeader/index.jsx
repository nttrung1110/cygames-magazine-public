import { isMobile } from "react-device-detect";

import Image from "~/components/Image";

import formatTime from "~/utils/formatTime";

import classNames from "classnames/bind";
import styles from "./ArticleHeader.module.scss";

const cx = classNames.bind(styles);

const ArticleHeader = ({ article }) => {
  return (
    <header className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("category")}>{article.category}</div>
        <time className={cx("date")}>{formatTime(article.createdAt)}</time>
      </div>
      <h1 className={cx("title", { mobile: isMobile })}>{article.title}</h1>
      <figure className={cx("thumbnail", { mobile: isMobile })}>
        <Image src={article.thumbnail.url} alt={article.title} />
      </figure>
    </header>
  );
};

export default ArticleHeader;
