import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Layout from "../layout";

const PrivateRoute = ({ Component }) => {
  const { auth } = useSelector((state) => state.auth);

  return auth ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
