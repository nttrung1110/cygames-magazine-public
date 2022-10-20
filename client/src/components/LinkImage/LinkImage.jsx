import { Link } from "react-router-dom";

import "./LinkImage.scss";

const LinkImage = ({ url, image }) => {
  return (
    <section className="link__list">
      {url === "tech" ? (
        <a href="https://tech.cygames.co.jp/" target="_blank" rel="noreferrer">
          <img src={image} alt="" />
        </a>
      ) : (
        <Link to={`${url}`}>
          <img src={image} alt="" />
        </Link>
      )}
    </section>
  );
};

export default LinkImage;
