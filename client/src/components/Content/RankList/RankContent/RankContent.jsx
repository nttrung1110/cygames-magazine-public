import { useContext } from "react";
import { Link } from "react-router-dom";

import { LayoutContext } from "../../../../contexts/LayoutContext";

import "./RankContent.scss";

const RankContent = (props) => {
  const articles = props.articles;

  const { formatTime, handleLinkChange } = useContext(LayoutContext);

  return (
    <ul className="rank__content">
      {articles &&
        articles.map((article, index) => {
          return (
            <li key={article._id} onClick={handleLinkChange}>
              <Link
                to={`/archives/${article.url_name}`}
                className="rank__wrapper"
              >
                <figure className="rank__thumb">
                  <span className="icon__rank">{++index}</span>
                  <img
                    src={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.image_name}.png`}
                  />
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
