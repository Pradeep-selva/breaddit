import React from "react";
import { connect } from "react-redux";
import { IReduxState } from "../Redux";
import { Redirect, Route } from "react-router";

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      isAuthenticated ? <Redirect to={"/"} /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state: IReduxState) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(AuthRoute);
