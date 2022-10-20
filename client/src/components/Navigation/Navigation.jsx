import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import CATEGORY from "~/assets/category";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav className={`${!isMobile ? "header__nav" : "header__nav--mobile"}`}>
      <ul className="header__nav--list">
        {CATEGORY.slice(0, 3).map((category, index) => {
          return (
            <li className="header__nav--item" key={index}>
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
