import { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ShareArea from "~/components/ShareArea/ShareArea";
import TagList from "~/components/TagList/TagList";

import { setLayout } from "~/redux/layoutSlice";

import CATEGORY from "~/assets/category";
import images from "~/assets/images";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { languageMenu, hamburgerMenu } = useSelector((state) => state.layout);
  const [searchValue, setSearchValue] = useState("");

  const handleClickHamburgerMenu = () => {
    dispatch(setLayout({ hamburgerMenu: !hamburgerMenu, languageMenu: false }));
  };

  const handleClickLanguageMenu = () => {
    dispatch(setLayout({ languageMenu: !languageMenu, hamburgerMenu: false }));
  };

  const handleLinkChange = () => {
    dispatch(setLayout({ languageMenu: false, hamburgerMenu: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchValue("");

    handleLinkChange();

    navigate(`/search/?s=${searchValue}`);
  };

  return (
    <header className={`${!isMobile ? "header" : "header--mobile"}`}>
      <div className="header__topbar">
        <div className="header__logo">
          <Link to={"/"}>
            {!isMobile ? (
              <Fragment>
                <img src={images.logo_header} alt="Cygames Magazine" />
                <span>
                  <img
                    src={images.txt_header_catch}
                    alt="Media Exploring the Best in Entertainment"
                  />
                </span>
              </Fragment>
            ) : (
              <img
                src={images.logo_header_sp}
                alt="Cygames Magazine Media Exploring the Best in Entertainment"
              />
            )}
          </Link>
        </div>
        <div className="dropdown__language">
          <p
            className={`dropdown__language--text ${
              languageMenu ? "is-fade" : ""
            }`}
            onClick={handleClickLanguageMenu}
          >
            <img
              src={`${
                !isMobile ? images.txt_language : images.btn_language_sp
              }`}
              alt=""
            />
            {isMobile && languageMenu && (
              <span className="dropdown__arrow"></span>
            )}
          </p>
          {!isMobile ? (
            <ul
              className={`dropdown__language--list ${
                languageMenu ? "is-active" : ""
              }`}
            >
              <li>
                <Link to={"#"} onClick={handleLinkChange}>
                  日本語
                </Link>
              </li>
              <li>
                <Link to={"#"} onClick={handleLinkChange}>
                  简体中文
                </Link>
              </li>
              <li>
                <Link to={"#"} onClick={handleLinkChange}>
                  繁體中文
                </Link>
              </li>
              <li>
                <Link to={"#"} onClick={handleLinkChange}>
                  한국어
                </Link>
              </li>
            </ul>
          ) : (
            languageMenu && (
              <div className="dropdown__wrapper">
                <ul className="dropdown__language--list">
                  <li>
                    <Link to={"#"} onClick={handleLinkChange}>
                      日本語
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} onClick={handleLinkChange}>
                      简体中文
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} onClick={handleLinkChange}>
                      繁體中文
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} onClick={handleLinkChange}>
                      한국어
                    </Link>
                  </li>
                </ul>
              </div>
            )
          )}
        </div>
        <div
          className={`hamburger__trigger ${hamburgerMenu ? "is-active" : ""}`}
          onClick={handleClickHamburgerMenu}
        >
          <div className="hamburger__line">
            <span className="hamburger__item"></span>
            <span className="hamburger__item"></span>
          </div>
        </div>
        <div className={`hamburger__menu ${hamburgerMenu ? "is-open" : ""}`}>
          <div className="hamburger__inner">
            <div className="content-l">
              <nav className="nav">
                <ul className="nav__list">
                  {CATEGORY.slice(0, 3).map((category, index) => {
                    return (
                      <li className="nav__item" key={index}>
                        <Link
                          to={`/archives/category/${category.path}`}
                          onClick={handleLinkChange}
                        >
                          <span className="nav__item--cat">
                            {category.name}
                          </span>
                          <span className="nav__item--des">
                            {category.description}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              {!isMobile && <ShareArea />}
            </div>
            <div className="content-r">
              <TagList limit={10} />

              <div className="searh">
                <form>
                  <input
                    type="text"
                    placeholder="SEARCH"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  <button onClick={handleSubmit}>
                    <img src={images.ico_search} alt="search icon" />
                  </button>
                </form>
              </div>
              {isMobile && <ShareArea />}
            </div>
          </div>
        </div>
        <div className="header__button">
          <a
            href="https://recruit.cygames.co.jp/"
            target="_blank"
            rel="noreferrer"
          >
            <span>RECRUIT</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
