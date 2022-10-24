import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ Component }) => {
  const { auth } = useSelector((state) => state.auth);

  return !auth ? <Component /> : <Navigate to="/" />;
};

export default PublicRoute;
