import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import classNames from "classnames/bind";
import styles from "./NavShare.module.scss";

const cx = classNames.bind(styles);

const NavShare = ({ article }) => {
  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let sticky = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        sticky = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      sticky = false;
    };

    const onScroll = () => {
      if (!sticky) {
        window.requestAnimationFrame(updateScrollDir);
        sticky = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <div className={cx("container", { show: scrollDir === "up" })}>
      <span>SHARE</span>
      <ul>
        <li>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton
            title={`${article.meta} | Cygames Magazine | Cygames`}
            url={window.location.href}
            hashtags={[`CygamesMagazine`]}
          >
            <TwitterIcon size={36} round />
          </TwitterShareButton>
        </li>
      </ul>
    </div>
  );
};

export default NavShare;
