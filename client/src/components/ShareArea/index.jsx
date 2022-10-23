import { Fragment } from "react";

import Image from "../Image";

import SOCIAL from "~/assets/social";

import classNames from "classnames/bind";
import styles from "./ShareArea.module.scss";

const cx = classNames.bind(styles);

const ShareArea = ({ className }) => {
  return (
    <Fragment>
      <div className={cx("container", className)}>
        <p>FOLLOW US</p>
        <ul>
          {SOCIAL.map((item) => (
            <li key={item.name}>
              <a href={item.url} rel="noreferrer" target="_blank">
                <Image src={item.icon} alt={item.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ShareArea;
