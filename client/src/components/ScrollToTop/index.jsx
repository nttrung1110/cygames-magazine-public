import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import { setLayout } from "~/redux/layoutSlice";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLayout({ languageMenu: false, hamburgerMenu: false }));

    scroll.scrollToTop({
      duration: 300,
      delay: 0,
      smooth: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
