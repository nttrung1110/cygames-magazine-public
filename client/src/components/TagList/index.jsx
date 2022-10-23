import { Fragment } from "react";
import { useSelector } from "react-redux";

import NavigationButton from "../NavigationButton";
import Spinner from "../Spinner";
import TagsContent from "./TagContent";

import classNames from "classnames/bind";
import styles from "./TagList.module.scss";

const cx = classNames.bind(styles);

const TagList = ({ limit = 999, border = true, className }) => {
  const { tags, loading } = useSelector((state) => state.tag);

  return (
    <section className={cx("container", className)}>
      <h2 className={cx("title")}>PICK UP TAGS</h2>

      {!loading ? (
        <Fragment>
          <TagsContent
            tags={tags.slice(0, limit)}
            className={className}
            border={border}
          />

          <NavigationButton
            text={"VIEW MORE"}
            url={"/tag_list"}
            direction={cx("right")}
          />
        </Fragment>
      ) : (
        <Spinner className={cx("tagComponent")} />
      )}
    </section>
  );
};

export default TagList;
