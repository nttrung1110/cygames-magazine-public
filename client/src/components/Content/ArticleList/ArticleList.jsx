import { useContext } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import TagList from "../TagList/TagsContent/TagsContent";

import { LayoutContext } from "../../../contexts/LayoutContext";

import "./ArticleList.scss";

const ArticleList = (props) => {
  const articles = props.articles;

  const { formatTime, handleLinkChange } = useContext(LayoutContext);

  return (
    <section className="article__list">
      <ul>
        {articles.map((article) => {
          return (
            <li
              key={article._id}
              className={`${
                !isMobile ? "article__card" : "article__card--mobile"
              }`}
            >
              <Link
                to={`/archives/${article.url_name}`}
                onClick={handleLinkChange}
                className="artilce__wrapper"
              ></Link>
              <div className="article__inner">
                {article.isNewArticle && (
                  <span className="icon__new">
                    <span>NEW</span>
                  </span>
                )}
                <figure className="article__thumb">
                  <img
                    src={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.image_name}.png`}
                  />
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
  );
};

export default ArticleList;
