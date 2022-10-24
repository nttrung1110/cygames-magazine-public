import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import SearchForm from "../components/SearchForm";
import Sidebar from "../components/Sidebar";
import Toastify from "../components/Toastify";

const Layout = ({ children }) => {
  const { loading } = useSelector((state) => state.loading);

  return (
    <Fragment>
      <div className="flex">
        {/* sidebar section */}
        <Sidebar />
        {/* content section */}
        <div className="flex-1 min-h-screen bg-gray-100">
          <SearchForm />
          <div className="max-w-screen-xl mx-auto mb-4">{children}</div>
        </div>
      </div>
      <Toastify />
      {loading && <Loading />}
    </Fragment>
  );
};

export default Layout;
