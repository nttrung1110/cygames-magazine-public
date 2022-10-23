import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setLayout } from "~/redux/layoutSlice";

import images from "~/assets/images";
import Image from "~/components/Image";
import LANGUAGE from "~/assets/language";

import classNames from "classnames/bind";
import styles from "./LanguageMenu.module.scss";

const cx = classNames.bind(styles);

const LanguageMenu = ({ handleLinkChange }) => {
  const dispatch = useDispatch();

  const { languageMenu } = useSelector((state) => state.layout);

  const handleToggle = () => {
    dispatch(setLayout({ languageMenu: !languageMenu, hamburgerMenu: false }));
  };

  const renderCategoryList = () => {
    return (
      <ul
        className={cx(
          { list: !isMobile },
          { list_mobile: isMobile },
          { active: !isMobile && languageMenu }
        )}
      >
        {LANGUAGE.map((item) => (
          <li key={item.name} className={cx("item")}>
            <Link to={"#"} className={cx("link")} onClick={handleLinkChange}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={cx("container", { mobile: isMobile })}>
      <p
        className={cx(
          { button: !isMobile },
          { button_mobile: isMobile },
          { fade: languageMenu }
        )}
        onClick={handleToggle}
      >
        <Image
          src={`${isMobile ? images.btn_language_sp : images.txt_language}`}
          alt=""
        />

        {languageMenu && isMobile && <span className="arrow"></span>}
      </p>

      {isMobile ? (
        <div className={cx("wrapper")}>
          {languageMenu && renderCategoryList()}
        </div>
      ) : (
        renderCategoryList()
      )}
    </div>
  );
};

export default LanguageMenu;
