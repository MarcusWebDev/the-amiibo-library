import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const RequireAuthentication = ({ component }) => {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return component;
};

export default RequireAuthentication;
