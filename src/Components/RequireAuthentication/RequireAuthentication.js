import React, { useEffect } from "react";
import { redirect, useNavigate, useOutletContext } from "react-router-dom";

const RequireAuthentication = ({ component }) => {
  const navigate = useNavigate();
  const context = useOutletContext();
  const user = context.user;

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user]);

  return component;
};

export default RequireAuthentication;
