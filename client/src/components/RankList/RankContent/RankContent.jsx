import { Link } from "react-router-dom";

import formatTime from "~/utils/formatTime";

import "./RankContent.scss";

const RankContent = (props) => {
  const articles = props.articles;

  return (
    <ul className="rank__content">
      {articles &&
        articles.map((article, index) => {
          return (
            <li key={article._id}>
              <Link to={`/archives/${article.slug}`} className="rank__wrapper">
                <figure className="rank__thumb">
                  <span className="icon__rank">{++index}</span>
                  <img src={article.thumbnail.url} alt={article.title} />
                </figure>
                <div className="rank__detail">
                  <div className="rank__title">
                    <p>{article.title}</p>
                  </div>
                  <div className="rank__info">
                    <time>{formatTime(article.createdAt)}</time>
                    <span
                      className={`category ${
                        article.category === "MOVIE" ? "category-movie" : ""
                      }`}
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
