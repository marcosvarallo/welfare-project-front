import React, { useContext, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./Context";

const RoutesPrivate = ({ component: Component, ...rest }) => {
  const { userRole } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        return userRole === "ADMIN" ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default RoutesPrivate;
