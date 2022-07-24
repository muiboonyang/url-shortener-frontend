import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  children: JSX.Element;
};

const Protected = ({ isLoggedIn, children }: Props) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
