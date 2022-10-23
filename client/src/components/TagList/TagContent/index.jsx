import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import classNames from "classnames/bind";
import styles from "./TagContent.module.scss";

const cx = classNames.bind(styles);

const TagContent = ({ tags, border = true, className }) => {
  return (
    <ul
      className={cx("container", { border }, { mobile: isMobile }, className)}
    >
      {tags.map((tag) => {
        return (
          <li key={tag._id}>
            <Link to={`/archives/tag/${tag.slug}`}>
              <span>{tag.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TagContent;
