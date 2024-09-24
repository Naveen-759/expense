import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalState";

const Logout = () => {
  const { userLogOut } = useGlobal();
  useEffect(() => {
    userLogOut();
  }, [userLogOut]);
  return <Navigate to="/" />;
};

export default Logout;
