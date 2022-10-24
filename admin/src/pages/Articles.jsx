import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ArticleCard from "../components/ArticleCard/index.jsx";

import { setArticles_slice } from "../redux/articleSlice";
import { setToastify_slice } from "../redux/toastifySlice";

import { getArticles } from "../services/articleService";

let CURRENT_PAGE = 1;

const Articles = () => {
  const { articles, totalPage } = useSelector((state) => state.article);

  const dispatch = useDispatch();

  const paginationArr = new Array(totalPage).fill(" ");

  const fetchArticles = async () => {
    const { articles, totalPage, error } = await getArticles(CURRENT_PAGE);

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    dispatch(setArticles_slice({ articles, totalPage }));
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNextArticles = async (index) => {
    CURRENT_PAGE = index;

    fetchArticles();
  };

  return (
    <Fragment>
      <div className="grid grid-cols-4 gap-3">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
      {paginationArr.length > 1 && (
        <ul className="flex items-center space-x-2 mt-4">
          {paginationArr.map((_, index) => (
            <li
              key={index}
              className={`flex items-center justify-center border border-gray-500 rounded-full ${
                index + 1 === CURRENT_PAGE ? "bg-primary" : ""
              }`}
            >
              <button
                onClick={() => fetchNextArticles(index + 1)}
                className="w-12 h-12"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Articles;
