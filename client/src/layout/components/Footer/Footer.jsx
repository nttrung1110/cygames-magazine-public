/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import ShareArea from "~/components/ShareArea/ShareArea";

import images from "~/assets/images";

import "./Footer.scss";

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
      className={`${
        !isMobile ? "footer__container" : "footer__container--mobile"
      } `}
      ref={footerContainer}
    >
      {!isMobile ? (
        isVisible && (
          <p className={`scroll__toTop ${isStopped && "is--stopped"}`}>
            <a onClick={scrollToTop}>PAGE TOP</a>
          </p>
        )
      ) : (
        <p className="scroll__toTop">
          <a onClick={scrollToTop}>PAGE TOP</a>
        </p>
      )}
      {isMobile && <ShareArea />}
      <div className="footer__up">
        <ul className="footer__up-nav">
          {!isMobile && (
            <li className="footer__up-logo">
              <img src={images.logo_footer} alt="" />
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
        {!isMobile && <ShareArea />}
      </div>
      <div className="footer__bottom">
        <div className="footer__logo">
          <a href="https://www.cygames.co.jp/" target="_blank" rel="noreferrer">
            <img src={images.logo_cygames_white} alt="" />
          </a>
        </div>
        <p className="footer__copyright">
          <small>© Cygames, Inc.</small>
        </p>
      </div>
    </div>
  );
};

export default Footer;
