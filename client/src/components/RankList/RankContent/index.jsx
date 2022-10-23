import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Image from "~/components/Image";

import formatTime from "~/utils/formatTime";

import classNames from "classnames/bind";
import styles from "./RankContent.module.scss";

const cx = classNames.bind(styles);

const RankContent = ({ articles }) => {
  return (
    <ul className={cx("container", { mobile: isMobile })}>
      {articles.map((article, index) => {
        return (
          <li key={article._id}>
            <Link
              to={`/archives/${article.slug}`}
              className={cx("wrapper", { mobile: isMobile })}
            >
              <figure
                className={cx("article--thumbnail", { mobile: isMobile })}
              >
                <span className={cx("icon")}>{++index}</span>
                <Image src={article.thumbnail.url} alt={article.title} />
              </figure>
              <div className={cx("detail", { mobile: isMobile })}>
                <div className={cx("article--title")}>
                  <p>{article.title}</p>
                </div>
                <div className={cx("info")}>
                  <time>{formatTime(article.createdAt)}</time>
                  <span
                    className={cx(
                      article.category === "MOVIE" ? "movie" : "category"
                    )}
                  >
                    {article.category}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default RankContent;
