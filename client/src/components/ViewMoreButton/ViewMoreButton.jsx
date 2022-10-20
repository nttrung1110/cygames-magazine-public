import { Link } from "react-router-dom";

import "./ViewMoreButton.scss";

const ViewMoreButton = ({ url }) => {
  return (
    <div className="more__button">
      <Link to={`${url}`}>
        <span>VIEW MORE</span>
      </Link>
    </div>
  );
};

export default ViewMoreButton;
