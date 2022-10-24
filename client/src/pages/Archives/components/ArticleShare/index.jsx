import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import classNames from "classnames/bind";
import styles from "./ArticleShare.module.scss";

const cx = classNames.bind(styles);

const ArticleShare = ({ article }) => {
  return (
    <div className={cx("container")}>
      <FacebookShareButton url={window.location.href}>
        <div className={cx("button", "facebook")}>
          <FacebookIcon size={20} round={false} />
          <span>Share</span>
        </div>
      </FacebookShareButton>

      <TwitterShareButton
        title={`${article?.meta?.title} | Cygames Magazine | Cygames`}
        url={window.location.href}
        hashtags={[`CygamesMagazine`]}
      >
        <div className={cx("button", "twitter")}>
          <TwitterIcon size={20} round={false} />
          <span>Tweet</span>
        </div>
      </TwitterShareButton>
    </div>
  );
};

export default ArticleShare;
