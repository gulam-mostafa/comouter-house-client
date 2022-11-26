import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Components/Context/AuthProvider";
import Loading from "../Components/Loading";

const PriveteRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default PriveteRouter;
