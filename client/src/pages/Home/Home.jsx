import { Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";
import { Helmet } from "react-helmet";

import ArticleList from "~/components/ArticleList/ArticleList";
import LinkImage from "~/components/LinkImage/LinkImage";
import Navigation from "~/components/Navigation/Navigation";
import RankList from "~/components/RankList/RankList";
import Slider from "~/components/Slider/Slider";
import TagList from "~/components/TagList/TagList";

import images from "~/assets/images";

import "./Home.scss";

const Home = () => {
  const { articles } = useSelector((state) => state.article);

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
          content={`https://cygames-magazine.netlify.app`}
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
          content={`https://cygames-magazine.netlify.app`}
        />
      </Helmet>
      <Navigation />

      <BrowserView className="wrapper__column">
        <Slider />
        <div className="container">
          <div className="left__column">
            <ArticleList articles={articles} limit={10} viewMoreButton={true} />
          </div>
          <div className="right__column">
            <TagList limit={10} />
            <RankList />
            <LinkImage data={images.Link_Home_2} url={"tech"} />
          </div>
        </div>
      </BrowserView>

      <MobileView className="main__column">
        <h2 className="new__title">LATEST</h2>
        <ArticleList articles={articles} limit={10} viewMoreButton={true} />
        <TagList limit={10} />
        <RankList />
        <LinkImage data={images.Link_Home_2} url={"tech"} />
      </MobileView>
    </Fragment>
  );
};

export default Home;
