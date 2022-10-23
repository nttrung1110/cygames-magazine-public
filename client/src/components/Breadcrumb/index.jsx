import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";

const cx = classNames.bind(styles);

const Breadcrumb = ({ crumbs, className }) => {
  const isLast = (index) => {
    return index === crumbs.length - 1;
  };

  return (
    <div className={cx("container", className)}>
      <ul className={cx("list")}>
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
  );
};

export default Breadcrumb;
