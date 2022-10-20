import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ViewMoreButton from "../ViewMoreButton/ViewMoreButton";
import TagsContent from "./TagsContent/TagsContent";

import { getTags } from "~/api/tag";

import { setTags } from "~/redux/tagSlice";

import "./TagList.scss";

const TagList = ({ limit = 999 }) => {
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
  }, [limit]);

  return (
    <Fragment>
      {!loading ? (
        <section className="tags__list">
          <h2 className="tags__title">PICK UP TAGS</h2>
          <TagsContent tags={tags.slice(0, limit)} />
          <ViewMoreButton url={"/tag_list"} />
        </section>
      ) : (
        <div className="spinner__border--container">
          <div className="spinner__border"></div>
        </div>
      )}
    </Fragment>
  );
};

export default TagList;
