import { Link } from "react-router-dom";

import "./Breadcrumb.scss";

const Breadcrumb = ({ crumbs }) => {
  const isLast = (index) => {
    return index === crumbs.length - 1;
  };

  return (
    <div className="breadcrumb">
      <div className="breadcrumb__inner">
        <ul className="breadcrumb__list">
          {crumbs.map((crumb, index) => {
            const disabled = isLast(index) || !crumb.path;

            return (
              <li key={index}>
                {disabled ? (
                  crumb.name
                ) : (
                  <Link to={crumb.path}>{crumb.name}</Link>
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
