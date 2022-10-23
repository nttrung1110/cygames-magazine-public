import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import TagList from "../TagList/TagContent";
import Image from "../Image";

import formatTime from "~/utils/formatTime";

import classNames from "classnames/bind";
import styles from "./ArticleList.module.scss";

const cx = classNames.bind(styles);

const ArticleList = ({ articles, limit = 999 }) => {
  return (
    <Fragment>
      <section className={cx("container", { mobile: isMobile })}>
        <ul>
          {articles.slice(0, limit).map((article) => {
            return (
              <li
                key={article._id}
                className={cx("card", { mobile: isMobile })}
              >
                <Link
                  to={`/archives/${article.slug}`}
                  className={cx("wrapper")}
                ></Link>
                <div className={cx("inner", { mobile: isMobile })}>
                  {article.isNewArticle && (
                    <span className={cx("new", { mobile: isMobile })}>
                      <span>NEW</span>
                    </span>
                  )}
                  <figure
                    className={cx("article--thumbnail", { mobile: isMobile })}
                  >
                    <Image src={article.thumbnail.url} alt={article.title} />
                  </figure>
                  <div className={cx("detail", { mobile: isMobile })}>
                    <div className={cx("article--title", { mobile: isMobile })}>
                      <h3>{article.title}</h3>
                    </div>
                    <div className={cx("info", { mobile: isMobile })}>
                      <time>{formatTime(article.createdAt)}</time>
                      <span
                        className={cx(
                          article.category !== "MOVIE" ? "category" : "movie",
                          { mobile: isMobile }
                        )}
                      >
                        {article.category}
                      </span>
                    </div>
                    <TagList
                      tags={article.tags}
                      className={
                        isMobile ? cx("articleList--mobile") : cx("articleList")
                      }
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </Fragment>
  );
};

export default ArticleList;
