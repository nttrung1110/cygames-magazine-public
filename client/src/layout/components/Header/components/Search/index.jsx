import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Image from "~/components/Image";

import { setLayout } from "~/redux/layoutSlice";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKeywordk, setSearchKeywordk] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchKeywordk("");

    dispatch(setLayout({ languageMenu: false, hamburgerMenu: false }));

    navigate(`/search/?s=${searchKeywordk}`);
  };

  return (
    <div className={cx("container")}>
      <form>
        <input
          type="text"
          placeholder="SEARCH"
          value={searchKeywordk}
          onChange={(e) => {
            setSearchKeywordk(e.target.value);
          }}
        />
        <button onClick={handleSearch}>
          <Image src={images.ico_search} alt="search icon" />
        </button>
      </form>
    </div>
  );
};

export default Search;
