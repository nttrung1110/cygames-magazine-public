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

import Image from "../Image";
import Spinner from "../Spinner";

import formatTime from "~/utils/formatTime";

import "swiper/css";
import "swiper/css/effect-fade";
import "./Swiper.scss";

import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

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
        <div className={cx("container")}>
          <div className={cx("inner")}>
            <div
              onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
              onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
            >
              <Swiper
                modules={[EffectFade, Navigation, Pagination, Controller]}
                className={cx("swiper--info")}
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
                      <div className={cx("post--info")}>
                        <div className={cx("post--wrapper")}>
                          <span className={cx("post--category")}>
                            {article.category}
                          </span>
                          <time className={cx("post--date")}>
                            {formatTime(article.createdAt)}
                          </time>
                        </div>
                        <p className={cx("post--title")}>{article.title}</p>
                        <Link
                          to={`/archives/${article.slug}`}
                          className={cx("post--link")}
                        ></Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <a
                  className="prevImage"
                  role="button"
                  aria-label="Previous slide"
                ></a>
                <a
                  className="nextImage"
                  role="button"
                  aria-label="Next slide"
                ></a>
                <div className="paginationImage"></div>
              </Swiper>

              <Swiper
                ref={swiperRef}
                modules={[Controller]}
                className={cx("swiper--image")}
                loop={true}
                navigation={{
                  prevEl: ".prevImage",
                  nextEl: ".nextImage",
                }}
                pagination={{
                  el: ".paginationImage",
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
                      `.${cx("slide")}`
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
                      `.${cx("slide")}`
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
                        className={cx("slide")}
                        style={{
                          backgroundImage: `url(${article.thumbnail.url})`,
                        }}
                      >
                        <Image
                          src={article.thumbnail.url}
                          alt={article.title}
                        />
                      </figure>
                      <Link to={`/archives/${article.slug}`}></Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        <Spinner className={cx("slider")} />
      )}
    </Fragment>
  );
};

export default Slider;
