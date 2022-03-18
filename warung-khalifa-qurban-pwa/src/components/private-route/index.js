import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("users"));
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect to={`/login?ref=${props.location.pathname}`} />
      )
    }
    {...rest}
  />
);

export default withRouter(PrivateRoute);
