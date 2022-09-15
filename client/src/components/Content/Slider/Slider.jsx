import { Fragment, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Controller,
} from "swiper";

import { LayoutContext } from "../../../contexts/LayoutContext";

import "swiper/css";
import "swiper/css/effect-fade";

import "./Slider.scss";

const Slider = (props) => {
  SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

  const swiperRef = useRef(null);

  // store swiper instances
  const [infoSwiper, setInfoSwiper] = useState(null);
  const [imgSwiper, setImgSwiper] = useState(null);

  // articles data
  const size = props.articles.length < 5 ? props.articles.length : 5;
  const articles = props.articles.slice(0, size);

  const { formatTime, handleLinkChange } = useContext(LayoutContext);

  return (
    <Fragment>
      <div className="slider__container">
        <div className="slider__inner">
          <div
            className="swiper__mouseWrapper"
            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
          >
            {articles.length > 1 && (
              <>
                <Swiper
                  modules={[EffectFade, Navigation, Pagination, Controller]}
                  className="swiper__container--info"
                  loop={true}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true,
                  }}
                  onSwiper={setInfoSwiper}
                  controller={{ control: imgSwiper }}
                >
                  {articles.map((article) => {
                    return (
                      <SwiperSlide key={article._id}>
                        <div className="post__info">
                          <div className="post__info--upper">
                            <span className="category">{article.category}</span>
                            <time className="date">
                              {formatTime(article.createdAt)}
                            </time>
                          </div>
                          <p className="post__info--title">{article.title}</p>
                          <Link
                            to={`/archives/${article.url_name}`}
                            onClick={handleLinkChange}
                            className="post__info--wrapper"
                          ></Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                  <a
                    className="img-prev"
                    role="button"
                    aria-label="Previous slide"
                  ></a>
                  <a
                    className="img-next"
                    role="button"
                    aria-label="Next slide"
                  ></a>
                  <div className="img-pagination"></div>
                </Swiper>

                <Swiper
                  ref={swiperRef}
                  modules={[Controller]}
                  className="swiper__container--img"
                  loop={true}
                  navigation={{
                    prevEl: ".img-prev",
                    nextEl: ".img-next",
                  }}
                  pagination={{
                    el: ".img-pagination",
                  }}
                  speed={1000}
                  autoplay={{
                    delay: 3000,
                  }}
                  watchSlidesProgress={true}
                  onProgress={(swiper) => {
                    for (var e = 0; e < swiper.slides.length; e++) {
                      var t = swiper.slides[e].progress * (0.5 * swiper.width);
                      swiper.slides[e].querySelector(
                        ".slide-bgimg"
                      ).style.transform = "translateX(".concat(t, "px)");
                    }
                  }}
                  onSetTransition={(swiper, transition) => {
                    for (var t = 0; t < swiper.slides.length; t++) {
                      swiper.slides[t].style.transition = "".concat(
                        transition,
                        "ms"
                      );
                      swiper.slides[t].querySelector(
                        ".slide-bgimg"
                      ).style.transition = "".concat(transition, "ms");
                    }
                  }}
                  onSwiper={setImgSwiper}
                  controller={{ control: infoSwiper }}
                >
                  {articles.map((article) => {
                    return (
                      <SwiperSlide key={article._id}>
                        <figure
                          className="slide-bgimg"
                          style={{
                            backgroundImage: `url(https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.image_name}.png)`,
                          }}
                        >
                          <img
                            src={`https://res.cloudinary.com/cygames-magazine/image/upload/v1643205212/uploads/${article.image_name}.png`}
                          />
                        </figure>
                        <Link
                          to={`/archives/${article.url_name}`}
                          onClick={handleLinkChange}
                        ></Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Slider;
