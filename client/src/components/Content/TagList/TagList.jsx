import { Fragment } from "react";
import ViewMoreButton from "../ViewMoreButton/ViewMoreButton";
import TagsContent from "./TagsContent/TagsContent";
import "./TagList.scss";

const TagList = (props) => {
  const tags = props.tags;

  return (
    <Fragment>
      <section className="tags__list">
        <h2 className="tags__title">PICK UP TAGS</h2>
        <TagsContent tags={tags} />
        <ViewMoreButton url={"/tag_list"} />
      </section>
    </Fragment>
  );
};

export default TagList;
