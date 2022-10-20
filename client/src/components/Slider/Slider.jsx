/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, {
  Autoplay,
  Controller,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import formatTime from "~/utils/formatTime";

import "swiper/css";
import "swiper/css/effect-fade";

import "./Slider.scss";

const Slider = () => {
  const { articles, loading } = useSelector((state) => state.article);

  SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

  const swiperRef = useRef(null);

  // store swiper instances
  const [infoSwiper, setInfoSwiper] = useState(null);
  const [imgSwiper, setImgSwiper] = useState(null);

  const size = articles.length < 5 ? articles.length : 5;
  const swiperData = articles.slice(0, size);

  return (
    <Fragment>
      {!loading ? (
        <div className="slider__container">
          <div className="slider__inner">
            <div
              className="swiper__mouseWrapper"
              onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
              onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
            >
              {articles.length > 1 && (
                <Fragment>
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
                    {swiperData.map((article) => {
                      return (
                        <SwiperSlide key={article._id}>
                          <div className="post__info">
                            <div className="post__info--upper">
                              <span className="category">
                                {article.category}
                              </span>
                              <time className="date">
                                {formatTime(article.createdAt)}
                              </time>
                            </div>
                            <p className="post__info--title">{article.title}</p>
                            <Link
                              to={`/archives/${article.slug}`}
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
                        var t =
                          swiper.slides[e].progress * (0.5 * swiper.width);
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
                    {swiperData.map((article) => {
                      return (
                        <SwiperSlide key={article._id}>
                          <figure
                            className="slide-bgimg"
                            style={{
                              backgroundImage: `url(${article.thumbnail.url})`,
                            }}
                          >
                            <img
                              src={article.thumbnail.url}
                              alt={article.title}
                            />
                          </figure>
                          <Link to={`/archives/${article.slug}`}></Link>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner__border--container slider">
          <div className="spinner__border"></div>
        </div>
      )}
    </Fragment>
  );
};

export default Slider;
