import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../Spinner";
import NavigationButton from "../NavigationButton";
import TagsContent from "./TagContent";

import { getTags } from "~/api/tag";

import { setTags } from "~/redux/tagSlice";

import classNames from "classnames/bind";
import styles from "./TagList.module.scss";

const cx = classNames.bind(styles);

const TagList = ({ limit = 999, border = true, className }) => {
  const { tags, loading } = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  const fetchTags = async () => {
    const { tags, error } = await getTags();

    if (error) return console.log(error);

    dispatch(setTags({ tags }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
