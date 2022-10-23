import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ShareArea from "~/components/ShareArea";
import TagList from "~/components/TagList";
import Search from "../Search";

import { setLayout } from "~/redux/layoutSlice";

import CATEGORY from "~/assets/category";

import classNames from "classnames/bind";
import styles from "./HamburgerMenu.module.scss";

const cx = classNames.bind(styles);

const HamburgerMenu = ({ handleLinkChange }) => {
  const dispatch = useDispatch();

  const { hamburgerMenu } = useSelector((state) => state.layout);

  const handleToggle = () => {
    dispatch(setLayout({ hamburgerMenu: !hamburgerMenu, languageMenu: false }));
  };

  return (
    <Fragment>
      <div
        className={cx(
          { button: !isMobile },
          { button_mobile: isMobile },
          { active: hamburgerMenu }
        )}
        onClick={handleToggle}
      >
        <div className={cx("line", { mobile: isMobile })}>
          <span className={cx("item")}></span>
          <span className={cx("item")}></span>
        </div>
      </div>

      <div
        className={cx("menu", { mobile: isMobile }, { open: hamburgerMenu })}
      >
        <div className={cx("inner", { mobile: isMobile })}>
          <div className={cx("left", { mobile: isMobile })}>
            <nav>
              <ul>
                {CATEGORY.slice(0, 3).map((category, index) => {
                  return (
                    <li
                      className={cx("menu--item", { mobile: isMobile })}
                      key={index}
                    >
                      <Link
                        to={`/archives/category/${category.path}`}
                        onClick={handleLinkChange}
                      >
                        <span className={cx("name")}>{category.name}</span>
                        <span className={cx("description")}>
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
          <div className={cx("right", { mobile: isMobile })}>
            <TagList
              limit={10}
              className={isMobile && cx("hamburgermenu")}
              border={false}
            />

            <Search />

            {isMobile && <ShareArea />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HamburgerMenu;
