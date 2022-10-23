import { isMobile } from "react-device-detect";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";

const cx = classNames.bind(styles);

const Pagination = ({
  url,
  searchKeyword,
  pageCount,
  currentPage,
  handlePageChange,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = (data) => {
    scroll.scrollToTop({
      duration: 300,
      delay: 0,
      smooth: true,
    });

    if (url !== "search") {
      if (data.nextSelectedPage + 1 === 1) {
        navigate(`${url}`);
      } else {
        navigate(`${url}/page/${data.nextSelectedPage + 1}`);
      }
    } else {
      if (data.nextSelectedPage + 1 === 1) {
        navigate(`/search/?s=${searchKeyword}`);
      } else {
        navigate(
          `/search/page/${data.nextSelectedPage + 1}/?s=${searchKeyword}`
        );
      }
    }
  };

  return (
    <section className={cx("container", { mobile: isMobile }, className)}>
      <ReactPaginate
        previousLabel={false}
        nextLabel={false}
        breakLabel="..."
        pageCount={pageCount || 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        previousClassName={cx("prev")}
        nextClassName={cx("next")}
        breakClassName={cx("omit")}
        activeClassName={cx("active")}
        disabledClassName={cx("disabled")}
        forcePage={currentPage - 1}
        hrefAllControls
        hrefBuilder={
          (page) =>
            url === "search" // if url is search
              ? page !== 1 // if TRUE, check page
                ? `/search/page/${page}/?s=${searchKeyword}` // page !== 1
                : `/search/?s=${searchKeyword}` // page === 1
              : page !== 1 // if FALSE, check page
              ? `${url}/page/${page}` // page !== 1
              : `${url}` // page === 1
        }
        onClick={(clickEvent) => handleClick(clickEvent)}
      />
    </section>
  );
};

export default Pagination;
