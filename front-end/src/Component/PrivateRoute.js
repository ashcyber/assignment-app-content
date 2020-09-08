import React from "react";
import { Redirect, Route } from "react-router-dom";
import { verifyToken, setAuthToken } from "../Service/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("tollPlazaToken");
  const isLoggedIn = verifyToken();

  if (isLoggedIn) {
    setAuthToken(token);
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
