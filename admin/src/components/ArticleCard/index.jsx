import dateFormat from "dateformat";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { handleDeleteArticle } from "../../services/articleService";

const ArticleCard = ({ article }) => {
  const { slug, title, thumbnail, category, tags, createdAt } = article;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm rounded flex flex-col">
      <img src={thumbnail.url} alt={title} className="aspect-video" />
      <div className="flex-1 flex flex-col p-2">
        <h1 className="text-lg font-semibold text-gray-700 line-clamp-2">
          {title}
        </h1>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between mt-1">
            <p className="w-fit px-1 bg-gray-500 text-white text-sm">
              {category}
            </p>
            <p className="text-gray-500 text-sm">
              {dateFormat(createdAt, "mediumDate")}
            </p>
          </div>
          <ul className="text-gray-500 text-sm">
            {tags.map((tag) => (
              <li
                key={tag._id}
                className="inline-block mt-2 mr-2 overflow-hidden group"
              >
                <a
                  href="/"
                  className="block p-1 border border-gray-300 rounded-3xl  group-hover:bg-primary group-hover:border-primary
                  transition-all"
                >
                  <span className="before:content-['#'] before:text-primary group-hover:before:text-gray-500">
                    {tag.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center space-x-3 pt-2 mt-auto">
            <Link
              to={`/update-article/${slug}`}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-700"
            >
              <BsPencilSquare />
            </Link>
            <button
              onClick={() =>
                handleDeleteArticle(navigate, dispatch, article._id)
              }
              className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-700"
            >
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
