import { Link } from "react-router-dom";

import Image from "../Image";

import classNames from "classnames/bind";
import styles from "./LinkImage.module.scss";

const cx = classNames.bind(styles);

const LinkImage = ({ url, image, className }) => {
  return (
    <section className={cx("container", className)}>
      {url === "tech" ? (
        <a href="https://tech.cygames.co.jp/" target="_blank" rel="noreferrer">
          <Image src={image} alt="" />
        </a>
      ) : (
        <Link to={`${url}`}>
          <Image src={image} alt="" />
        </Link>
      )}
    </section>
  );
};

export default LinkImage;
