import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import Image from "~/components/Image";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./HeaderLogo.module.scss";

const cx = classNames.bind(styles);

const HeaderLogo = () => {
  return (
    <div className={cx("container", { mobile: isMobile })}>
      <Link to={"/"}>
        {isMobile ? (
          <Image
            src={images.logo_header_sp}
            alt="Cygames Magazine Media Exploring the Best in Entertainment"
          />
        ) : (
          <Fragment>
            <Image src={images.logo_header} alt="Cygames Magazine" />
            <span>
              <Image
                src={images.txt_header_catch}
                alt="Media Exploring the Best in Entertainment"
              />
            </span>
          </Fragment>
        )}
      </Link>
    </div>
  );
};

export default HeaderLogo;
