import { Fragment, useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";

import { LayoutContext } from "../../contexts/LayoutContext";
import { ArticleContext } from "../../contexts/ArticleContext";
import { TagContext } from "../../contexts/TagContext";

import ShareArea from "../Content/ShareArea/ShareArea";
import TagsArea from "../Content/TagList/TagList";

import logo_header from "../../assets/Header/logo_header.png";
import logo_header_sp from "../../assets/Header/logo_header_sp.png";
import txt_header_catch from "../../assets/Header/txt_header_catch.png";
import txt_language from "../../assets/Header/txt_language.svg";
import btn_language_sp from "../../assets/Header/btn_language_sp.svg";
import ico_search from "../../assets/Header/ico_search.svg";

import "./Header.scss";

const Header = (props) => {
  const tags = props.tags;
  const navigate = useNavigate();

  const {
    languageMenu,
    handleClickLanguageMenu,
    hamburgerMenu,
    handleClickHamburgerMenu,
    handleLinkChange,
    categoryData,
  } = useContext(LayoutContext);

  const {
    tagState: { tagsLoading },
  } = useContext(TagContext);

  const { getArticlesbySearchValue } = useContext(ArticleContext);

  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchValue("");

    handleLinkChange();

    getArticlesbySearchValue(searchValue, 1);
    navigate(`/search/?s=${searchValue}`);
  };

  return (
    <header className={`${!isMobile ? "header" : "header--mobile"}`}>
      <div className="header__topbar">
        <div className="header__logo">
          <Link to={"/"} onClick={handleLinkChange}>
            {!isMobile ? (
              <Fragment>
                <img src={logo_header} alt="Cygames Magazine" />
                <span>
                  <img
                    src={txt_header_catch}
                    alt="Media Exploring the Best in Entertainment"
                  />
                </span>
              </Fragment>
            ) : (
              <img
                src={logo_header_sp}
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
            <img src={`${!isMobile ? txt_language : btn_language_sp}`} alt="" />
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
                  {categoryData.slice(0, 3).map((category, index) => {
                    return (
                      <li className="nav__item" key={index}>
                        <Link
                          to={`/archives/category/${category.pathName}`}
                          onClick={handleLinkChange}
                        >
                          <span className="nav__item--cat">
                            {category.categoryName}
                          </span>
                          <span className="nav__item--des">
                            {category.categoryDes}
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
              {!tagsLoading ? (
                <TagsArea tags={tags} />
              ) : (
                <div className="spinner__border--container">
                  <div className="spinner__border"></div>
                </div>
              )}
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
                    <img src={ico_search} alt="search icon" />
                  </button>
                </form>
              </div>
              {isMobile && <ShareArea />}
            </div>
          </div>
        </div>
        <div className="header__button">
          <a href="https://recruit.cygames.co.jp/" target="_blank">
            <span>RECRUIT</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
