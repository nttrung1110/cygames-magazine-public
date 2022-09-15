import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "../../../../contexts/LayoutContext";
import "./TagsContent.scss";

const TagsContent = (props) => {
  const tags = props.tags;

  const { handleLinkChange } = useContext(LayoutContext);

  return (
    <ul className="tags__content">
      {tags &&
        tags.map((tag) => {
          return (
            <li key={tag._id}>
              <Link
                to={`/archives/tag/${tag.url_name}`}
                onClick={handleLinkChange}
              >
                <span>{tag.title}</span>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default TagsContent;
