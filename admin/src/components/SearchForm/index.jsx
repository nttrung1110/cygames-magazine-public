import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { useDebounce } from "../../hooks";

import { setToastify_slice } from "../../redux/toastifySlice";

import { searchArticle } from "../../services/articleService";

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    const fetchSearch = async () => {
      const { articles, error } = await searchArticle(debouncedValue);

      if (error) {
        return dispatch(
          setToastify_slice({ type: "error", text: error[0].msg })
        );
      }

      setSearchResult(articles);
      setLoading(false);
    };

    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className="mb-4 p-2 flex items-center justify-center">
      <HeadlessTippy
        visible={showResult && searchValue.length > 0}
        interactive
        render={(attrs) =>
          searchResult.length > 0 && (
            <div
              className="w-96 h-96 overflow-y-auto py-2 bg-white rounded shadow-md"
              tabIndex="-1"
              {...attrs}
            >
              {searchResult.map((item) => (
                <Link
                  key={item._id}
                  className="flex p-2 items-center hover:bg-gray-100"
                >
                  <img
                    src={item.thumbnail.url}
                    alt={item.title}
                    className="w-24 aspect-video"
                  />
                  <p className="text-sm ml-2 line-clamp-2">{item.title}</p>
                </Link>
              ))}
            </div>
          )
        }
        onClickOutside={handleHideResult}
      >
        <div className="relative w-96 flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles"
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
            className="w-full py-2 px-4 pr-14 border border-gray-500 rounded-3xl outline-none focus:ring-1 ring-primary"
          />
          {loading && (
            <AiOutlineLoading3Quarters
              size={18}
              className="absolute right-2 animate-spin"
            />
          )}
          {!!searchValue && !loading && (
            <button className="absolute right-2" onClick={handleClear}>
              <AiOutlineCloseCircle size={18} />
            </button>
          )}
        </div>
      </HeadlessTippy>
    </div>
  );
};

export default SearchForm;
