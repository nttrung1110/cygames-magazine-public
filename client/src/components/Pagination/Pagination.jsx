import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import "./Pagination.scss";

const Pagination = ({
  url,
  search_param,
  pageCount,
  currentPage,
  handlePageClick,
}) => {
  const navigate = useNavigate();

  const handlePageChange = (data) => {
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
        navigate(`/search/?s=${search_param}`);
      } else {
        navigate(
          `/search/page/${data.nextSelectedPage + 1}/?s=${search_param}`
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
        pageCount={pageCount || 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        previousClassName={"prev"}
        nextLinkClassName={"next"}
        breakClassName={"omit"}
        activeClassName={"active"}
        forcePage={currentPage - 1}
        hrefAllControls
        hrefBuilder={(page) =>
          url === "search"
            ? page !== 1
              ? `/search/page/${page}/?s=${search_param}`
              : `/search/?s=${search_param}`
            : page !== 1
            ? `${url}/page/${page}`
            : `${url}`
        }
        onClick={(clickEvent) => handlePageChange(clickEvent)}
      />
    </section>
  );
};

export default Pagination;
