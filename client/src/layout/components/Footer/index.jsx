/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import Image from "~/components/Image";
import ShareArea from "~/components/ShareArea";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  const footerContainer = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 300,
      delay: 0,
      smooth: true,
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      let currentPosition = window.scrollY;

      if (currentPosition >= document.body.clientHeight * 0.25) {
        setIsVisible(true);
        setIsStopped(
          footerContainer.current.getBoundingClientRect().top <=
            window.innerHeight
        );
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={cx("container", { mobile: isMobile })}
      ref={footerContainer}
    >
      {(isMobile || isVisible) && (
        <p
          className={cx(isMobile ? "scroll_mobile" : "scroll", {
            stopped: !isMobile && isStopped,
          })}
        >
          <a onClick={scrollToTop}>PAGE TOP</a>
        </p>
      )}

      {isMobile && <ShareArea className={cx("footer_mobile")} />}

      <div className={cx("top", { mobile: isMobile })}>
        <ul className={cx("list")}>
          {!isMobile && (
            <li className={cx("logo")}>
              <Image src={images.logo_footer} alt="" />
            </li>
          )}
          <li>
            <Link to={"/"}>TOP</Link>
          </li>
          <li>
            <a
              href="https://www.cygames.co.jp/policy/"
              target="_blank"
              rel="noreferrer"
            >
              PRIVACY POLICY
            </a>
          </li>
        </ul>

        {!isMobile && <ShareArea className={cx("footer")} />}
      </div>

      <div className={cx("bottom")}>
        <div className={cx("logo")}>
          <a href="https://www.cygames.co.jp/" target="_blank" rel="noreferrer">
            <Image src={images.logo_cygames_white} alt="" />
          </a>
        </div>
        <p className={cx("copyright")}>
          <small>© Cygames, Inc.</small>
        </p>
      </div>
    </div>
  );
};

export default Footer;
