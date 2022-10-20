import { Fragment } from "react";

import images from "~/assets/images";

import "./ShareArea.scss";

const ShareArea = () => {
  return (
    <Fragment>
      <div className="share__area">
        <p>FOLLOW US</p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/Cygames/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.ico_sns_fb} alt="Facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/Cygames_PR"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.ico_sns_tw} alt="Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/cygames_inc/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.ico_sns_inst} alt="Instagram" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/user/CygamesChannel"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.ico_sns_yt} alt="Youtube" />
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default ShareArea;
