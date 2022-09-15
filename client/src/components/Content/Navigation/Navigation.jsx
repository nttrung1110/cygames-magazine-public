import { useContext } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import { LayoutContext } from "../../../contexts/LayoutContext";

import "./Navigation.scss";

const Navigation = () => {
  const { handleLinkChange, categoryData } = useContext(LayoutContext);

  return (
    <nav className={`${!isMobile ? "header__nav" : "header__nav--mobile"}`}>
      <ul className="header__nav--list">
        {categoryData.slice(0, 3).map((category, index) => {
          return (
            <li className="header__nav--item" key={index}>
              <Link
                to={`/archives/category/${category.pathName}`}
                onClick={handleLinkChange}
              >
                <span>{category.categoryName}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
