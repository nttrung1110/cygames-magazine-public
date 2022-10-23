import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import CATEGORY from "~/assets/category";

import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";

const cx = classNames.bind(styles);

const Navigation = () => {
  return (
    <nav className={cx("container", { mobile: isMobile })}>
      <ul className={cx("list", { mobile: isMobile })}>
        {CATEGORY.slice(0, 3).map((category, index) => {
          return (
            <li key={index} className={cx("item", { mobile: isMobile })}>
              <Link to={`/archives/category/${category.path}`}>
                <span>{category.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
