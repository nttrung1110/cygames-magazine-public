import { useContext } from "react";
import { Link } from "react-router-dom";

import { LayoutContext } from "../../../contexts/LayoutContext";

import "./LinkImage.scss";

const LinkImage = (props) => {
  const url = props.url;

  const { handleLinkChange } = useContext(LayoutContext);

  return (
    <section className="link__list">
      {url === "tech" ? (
        <a href="https://tech.cygames.co.jp/" target="_blank">
          <img src={props.data} alt="" />
        </a>
      ) : (
        <Link to={`${url}`} onClick={handleLinkChange}>
          <img src={props.data} alt="" />
        </Link>
      )}
    </section>
  );
};

export default LinkImage;
