import { Fragment } from "react";

import ico_sns_fb from "../../../assets/common/ico_sns_fb.svg";
import ico_sns_tw from "../../../assets/common/ico_sns_tw.svg";
import ico_sns_inst from "../../../assets/common/ico_sns_inst.svg";
import ico_sns_yt from "../../../assets/common/ico_sns_yt.svg";

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
              rel="noopener"
              target="_blank"
            >
              <img src={ico_sns_fb} alt="Facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/Cygames_PR"
              rel="noopener"
              target="_blank"
            >
              <img src={ico_sns_tw} alt="Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/cygames_inc/"
              rel="noopener"
              target="_blank"
            >
              <img src={ico_sns_inst} alt="Instagram" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/user/CygamesChannel"
              rel="noopener"
              target="_blank"
            >
              <img src={ico_sns_yt} alt="Youtube" />
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default ShareArea;
