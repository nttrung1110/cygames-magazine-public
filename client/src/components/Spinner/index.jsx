import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

const Spinner = ({ className }) => {
  return (
    <div className={cx("container", className)}>
      <div className={cx("border")}></div>
    </div>
  );
};

export default Spinner;
