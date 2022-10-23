import { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";

import NavigationButton from "../NavigationButton";

import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import Breadcrumb from "../Breadcrumb";

const cx = classNames.bind(styles);

const NotFound = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const pathName = window.location.pathname.split("/").slice(1);
    const newPathName = pathName.reduce(function (pathName, path) {
      var fromCharCode = String.fromCharCode;
      var firstLetterOfWordRegExp = /\b[a-z]|['_][a-z]|\B[A-Z]/g;

      function toLatin1UpperCase(x) {
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

    setTitle(`Nothing found for ${newPathName}`);
  }, []);

  const crumbs = [
    {
      name: "TOP",
      path: "/",
    },
    {
      name: "Not Found",
      path: false,
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className={cx("container", { mobile: isMobile })}>
        <Breadcrumb crumbs={crumbs} className={isMobile && "notfound"} />
        <div className={cx("text")}>
          <h2>Not Found</h2>
          <p>404 error</p>
        </div>
        <NavigationButton
          text={"BACK TO TOP"}
          url={"/tag_list"}
          direction={cx("left")}
          className={isMobile ? cx("notfound--mobile") : cx("notfound")}
        />
      </div>
    </Fragment>
  );
};

export default NotFound;
