import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ isAuth, children }) => {
  if (isAuth === undefined) return null;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;
