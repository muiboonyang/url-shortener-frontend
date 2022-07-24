import React from "react";
import { Navigate } from "react-router-dom";
import { JsxElement } from "typescript";

type Props = {
  isLoggedIn: boolean;
  children: JsxElement;
};

const Protected = ({ isLoggedIn, children }: Props) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>children</>;
};
export default Protected;
