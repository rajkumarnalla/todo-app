import { Navigate } from "react-router-dom";
import { getToken } from "../utils";
import { Layout } from "./Layout";

const ProtectedRoute = () => {
  return getToken() ? <Layout /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
