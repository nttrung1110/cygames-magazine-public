import { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { LayoutContext } from "../../contexts/LayoutContext";
import { TagContext } from "../../contexts/TagContext";

import "./NotFound.scss";

import { Helmet } from "react-helmet";

const NotFound = () => {
  const {
    tagState: { tags },
    getTags,
  } = useContext(TagContext);

  // Start: Get tags
  useEffect(() => {
    getTags();
  }, []);

  const { handleLinkChange } = useContext(LayoutContext);

  // HELMET
  const [TITLE, setTITLE] = useState("");

  useEffect(() => {
    const pathName = window.location.pathname.split("/").slice(1);
    const newPathName = pathName.reduce(function (pathName, path) {
      var fromCharCode = String.fromCharCode;
      var firstLetterOfWordRegExp = /\b[a-z]|['_][a-z]|\B[A-Z]/g;

      function toLatin1UpperCase(x) {
        // avoid frequent anonymous inline functions
        var charCode = x.charCodeAt(0);
        return charCode === 39 ? x : fromCharCode(charCode ^ 32);
      }

      return (
        pathName +
        path
          .replace(firstLetterOfWordRegExp, toLatin1UpperCase)
          .replace(/-/g, " ") +
        " "
      );
    }, "");
    //https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript

    setTITLE(`Nothing found for ${newPathName}`);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{TITLE}</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <Header tags={tags} />
      <div
        className={`${
          !isMobile ? "error__container" : "error__container--mobile"
        }`}
      >
        <div className="breadcrumb">
          <div className="breadcrumb__inner">
            <ul className="breadcrumb__list">
              <li>
                <Link to={"/"}>TOP</Link>
              </li>
              <li>Not Found</li>
            </ul>
          </div>
        </div>
        <div className="error__info">
          <h2>Not Found</h2>
          <p>404 error</p>
        </div>
        <div className="back__button">
          <Link to={`/`} onClick={handleLinkChange}>
            <span>BACK TO TOP</span>
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default NotFound;
