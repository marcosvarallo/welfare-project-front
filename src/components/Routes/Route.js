import React, { useContext } from "react";
import { Redirect, Route as RouterRoute } from "react-router";
import { GeneralStateContext } from "../../App";

const Route = (props) => {
  const { path } = props;
  const { generalState } = useContext(GeneralStateContext);

  if (generalState.logged) {
    if (path !== "/") {
      return <RouterRoute {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }, //eslint-disable-line
        }}
      />
    );
  }

  if (path === "/") {
    return <RouterRoute {...props} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location }, //eslint-disable-line
      }}
    />
  );
};

export default Route;
