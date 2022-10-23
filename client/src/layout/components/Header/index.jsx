import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";

import HamburgerMenu from "./components/HamburgerMenu";
import HeaderLogo from "./components/HeaderLogo";
import LanguageMenu from "./components/LanguageMenu";

import { setLayout } from "~/redux/layoutSlice";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();

  const handleLinkChange = () => {
    dispatch(setLayout({ languageMenu: false, hamburgerMenu: false }));
  };

  return (
    <header className={cx("container", { mobile: isMobile })}>
      <div className={cx("wrapper", { mobile: isMobile })}>
        <HeaderLogo />

        <LanguageMenu handleLinkChange={handleLinkChange} />

        <HamburgerMenu handleLinkChange={handleLinkChange} />

        <div className={cx("link--recruit", { mobile: isMobile })}>
          <a
            href="https://recruit.cygames.co.jp/"
            target="_blank"
            rel="noreferrer"
          >
            <span>RECRUIT</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
