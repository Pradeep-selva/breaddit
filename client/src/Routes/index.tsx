import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteNames } from "../Configs";
import { Home, Login, Signup } from "../Pages";
import { AuthRoute } from "../Services";

export const Routes = () => (
  <Switch>
    <Route exact path={RouteNames.home} component={Home} />
    <AuthRoute exact path={RouteNames.login} component={Login} />
    <AuthRoute exact path={RouteNames.signup} component={Signup} />
  </Switch>
);
