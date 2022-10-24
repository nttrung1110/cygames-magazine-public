import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setToastify_slice } from "../../redux/toastifySlice";

const Toastify = () => {
  const { type, text } = useSelector((state) => state.toastify);

  const dispatch = useDispatch();

  useEffect(() => {
    if (text && type) {
      switch (type) {
        case "success":
          toast.success(text);
          break;
        case "error":
          toast.error(text);
          break;
        case "warn":
          toast.warn(text);
          break;
        case "info":
          toast.info(text);
          break;
        default:
          return;
      }

      dispatch(setToastify_slice({ type: "", error: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, type]);

  return <ToastContainer />;
};

export default Toastify;
