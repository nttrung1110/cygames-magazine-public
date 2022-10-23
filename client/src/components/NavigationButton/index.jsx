import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./NavigationButton.module.scss";

const cx = classNames.bind(styles);

const NavigationButton = ({ url, text, direction, className }) => {
  return (
    <div className={cx("container", direction, className)}>
      <Link to={`${url}`}>
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default NavigationButton;
