import { useContext } from "react";
import { Link } from "react-router-dom";

import { LayoutContext } from "../../../contexts/LayoutContext";

import "./ViewMoreButton.scss";

const ViewMoreButton = (props) => {
  const url = props.url;

  const { handleLinkChange } = useContext(LayoutContext);

  return (
    <div className="more__button">
      <Link to={`${url}`} onClick={handleLinkChange}>
        <span>VIEW MORE</span>
      </Link>
    </div>
  );
};

export default ViewMoreButton;
