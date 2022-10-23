import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import classNames from "classnames/bind";
import styles from "./ArticleRelative.module.scss";

const cx = classNames.bind(styles);

const ArticleRelative = ({ prevArticle, nextArticle }) => {
  return (
    <ul className={cx("container", { mobile: isMobile })}>
      <li>
        {nextArticle && (
          <Link
            to={`/archives/${nextArticle.slug}`}
            className={cx("link", { mobile: isMobile })}
          >
            <div className={cx("prev")}>
              <span>PREV</span>
            </div>
            <p>{nextArticle.title}</p>
          </Link>
        )}
      </li>

      <li>
        {prevArticle && (
          <Link
            to={`/archives/${prevArticle.slug}`}
            className={cx("link", { mobile: isMobile })}
          >
            <div className={cx("next")}>
              <span>NEXT</span>
            </div>
            <p>{prevArticle.title}</p>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default ArticleRelative;
