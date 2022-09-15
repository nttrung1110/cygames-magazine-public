import React from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "./Pagination.scss";

const Pagination = (props) => {
  const navigate = useNavigate();

  const handlePageChange = (data) => {
    scroll.scrollToTop({
      duration: 300,
      delay: 0,
      smooth: true,
    });
    if (props.url !== "search") {
      if (data.nextSelectedPage + 1 === 1) {
        navigate(`${props.url}`);
      } else {
        navigate(`${props.url}/page/${data.nextSelectedPage + 1}`);
      }
    } else {
      if (data.nextSelectedPage + 1 === 1) {
        navigate(`/search/?s=${props.search_param}`);
      } else {
        navigate(
          `/search/page/${data.nextSelectedPage + 1}/?s=${props.search_param}`
        );
      }
    }
  };

  return (
    <section className="page__list">
      <ReactPaginate
        previousLabel={false}
        nextLabel={false}
        breakLabel="..."
        pageCount={props.pageCount ? props.pageCount : 1000}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={props.handlePageClick}
        previousClassName={"prev"}
        nextLinkClassName={"next"}
        breakClassName={"omit"}
        activeClassName={"active"}
        forcePage={props.currentPage - 1}
        hrefAllControls
        hrefBuilder={(page) =>
          props.url === "search"
            ? page !== 1
              ? `/search/page/${page}/?s=${props.search_param}`
              : `/search/?s=${props.search_param}`
            : page !== 1
            ? `${props.url}/page/${page}`
            : `${props.url}`
        }
        onClick={(clickEvent) => handlePageChange(clickEvent)}
      />
    </section>
  );
};

export default Pagination;
