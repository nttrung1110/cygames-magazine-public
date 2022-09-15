import { useState, useEffect, useRef, useContext } from "react";
import { animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { LayoutContext } from "../../contexts/LayoutContext";

import ShareArea from "../Content/ShareArea/ShareArea";
import logo_footer from "../../assets/Footer/logo_footer.png";
import logo_cygames_white from "../../assets/Footer/logo_cygames_white.svg";

import "./Footer.scss";

const Footer = () => {
  const footerContainer = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const { handleLinkChange } = useContext(LayoutContext);

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
              <img src={logo_footer} alt="" />
            </li>
          )}
          <li>
            <Link to={"/"} onClick={handleLinkChange}>
              TOP
            </Link>
          </li>
          <li>
            <a
              href="https://www.cygames.co.jp/policy/"
              target="_blank"
              rel="noopener"
            >
              PRIVACY POLICY
            </a>
          </li>
        </ul>
        {!isMobile && <ShareArea />}
      </div>
      <div className="footer__bottom">
        <div className="footer__logo">
          <a href="https://www.cygames.co.jp/" target="_blank" rel="noopener">
            <img src={logo_cygames_white} alt="" />
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
