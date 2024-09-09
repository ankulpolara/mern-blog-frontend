import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRoute = () => {
  const isAuth = useSelector((state) => state?.auth?.token);
  if (!isAuth) {
    toast.warn("First Login or Register for further process...");
  }
  return <div>{isAuth ? <Outlet /> : <Navigate to={"/sign-in"} />}</div>;
};
