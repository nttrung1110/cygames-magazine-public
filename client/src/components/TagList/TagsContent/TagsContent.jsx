import { Link } from "react-router-dom";

import "./TagsContent.scss";

const TagsContent = ({ tags }) => {
  return (
    <ul className="tags__content">
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

export default TagsContent;
