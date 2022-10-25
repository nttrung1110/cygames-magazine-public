import { Fragment } from "react";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import ArticleList from "~/components/ArticleList";
import LinkImage from "~/components/LinkImage";
import NavigationButton from "~/components/NavigationButton";
import RankList from "~/components/RankList";
import Slider from "~/components/Slider";
import Spinner from "~/components/Spinner";
import TagList from "~/components/TagList";
import Navigation from "~/components/Navigation";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const Home = () => {
  const { articles, loading } = useSelector((state) => state.article);

  return (
    <Fragment>
      <Helmet>
        <title>Cygames Magazine | Cygames</title>
        <meta
          name="description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cygames Magazine | Cygames" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/nt1110/image/upload/v1666587111/cygames-magazine/ogp_ykqoxv.png"
        />
        <meta
          property="og:description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />

        {/* <!-- Twitter Meta Tags --/> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CygamesMagazine" />
        <meta name="twitter:domain" content="cygames-magazine.netlify.app" />
        <meta name="twitter:title" content="Cygames Magazine | Cygames" />
        <meta
          name="twitter:description"
          content="Cygames Magazine's introductory article talks about the magazine's launch as a space to share information about Cygames, its team members, and various events."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/nt1110/image/upload/v1666587111/cygames-magazine/ogp_ykqoxv.png"
        />
      </Helmet>

      {!isMobile && (
        <Fragment>
          <Navigation />
          <Slider />
        </Fragment>
      )}

      <div className={cx("container", { mobile: isMobile })}>
        {!loading ? (
          <div className={cx("main", { mobile: isMobile })}>
            {isMobile && <h2 className={cx("title")}>LATEST</h2>}

            <ArticleList articles={articles} limit={10} />

            <NavigationButton
              url={"/all"}
              text={"VIEW MORE"}
              direction={cx("right")}
              className={isMobile ? cx("home--mobile") : cx("home")}
            />
          </div>
        ) : (
          <Spinner className={cx("home")} />
        )}

        <div className={cx("sub", { mobile: isMobile })}>
          <TagList
            limit={10}
            className={isMobile ? cx("home--mobile") : cx("home")}
          />

          <RankList className={!isMobile && cx("home")} />

          <LinkImage
            image={images.Link_Home_2}
            url={"tech"}
            className={isMobile && cx("home--mobile")}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
