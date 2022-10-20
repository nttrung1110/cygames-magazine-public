import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import TagList from "../TagList/TagsContent/TagsContent";
import ViewMoreButton from "../ViewMoreButton/ViewMoreButton";

import formatTime from "~/utils/formatTime";

import "./ArticleList.scss";

const ArticleList = ({ articles, limit = 999, viewMoreButton }) => {
  return (
    <Fragment>
      <section className="article__list">
        <ul>
          {articles.slice(0, limit).map((article) => {
            return (
              <li
                key={article._id}
                className={`${
                  !isMobile ? "article__card" : "article__card--mobile"
                }`}
              >
                <Link
                  to={`/archives/${article.slug}`}
                  className="artilce__wrapper"
                ></Link>
                <div className="article__inner">
                  {article.isNewArticle && (
                    <span className="icon__new">
                      <span>NEW</span>
                    </span>
                  )}
                  <figure className="article__thumb">
                    <img src={article.thumbnail.url} alt={article.title} />
                  </figure>
                  <div className="article__detail">
                    <div className="article__title">
                      <h3>{article.title}</h3>
                    </div>
                    <div className="article__info">
                      <time>{formatTime(article.createdAt)}</time>
                      <span
                        className={`${
                          article.category !== "MOVIE"
                            ? "category"
                            : "category movie"
                        }`}
                      >
                        {article.category}
                      </span>
                    </div>
                    <TagList tags={article.tags} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      {viewMoreButton && <ViewMoreButton url={"/all"} />}
    </Fragment>
  );
};

export default ArticleList;
