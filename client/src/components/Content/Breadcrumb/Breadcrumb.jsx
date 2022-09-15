import { useContext } from "react";
import { Link } from "react-router-dom";

import { LayoutContext } from "../../../contexts/LayoutContext";

import "./Breadcrumb.scss";

const Breadcrumb = (props) => {
  const isLast = (index) => {
    return index === props.crumbs.length - 1;
  };

  const { handleLinkChange } = useContext(LayoutContext);

  return (
    <div className="breadcrumb">
      <div className="breadcrumb__inner">
        <ul className="breadcrumb__list">
          {props.crumbs.map((crumb, index) => {
            const disabled = isLast(index) || !crumb.pathName;
            return (
              <li key={index} onClick={handleLinkChange}>
                {disabled ? (
                  crumb.crumbName
                ) : (
                  <Link to={crumb.pathName}>{crumb.crumbName}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
