import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAuthLoading_slice, setAuth_slice } from "../redux/authSlice";

import { verifyToken } from "../services/authService";

const useAuth = () => {
  const dispatch = useDispatch();

  const checkToken = async () => {
    dispatch(setAuthLoading_slice(true));

    const { success, error } = await verifyToken();

    dispatch(setAuthLoading_slice(false));

    if (error) return dispatch(setAuth_slice(false));

    if (success) {
      return dispatch(setAuth_slice(true));
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuth;
