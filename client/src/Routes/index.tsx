import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteNames } from "../Configs";
import { Home } from "../Pages";
import { AuthRoute } from "../Services";

export const Routes = () => (
  <Switch>
    <Route exact path={RouteNames.home} component={Home} />
    <AuthRoute exact path={RouteNames.login} component={Home} />
    <AuthRoute exact path={RouteNames.login} component={Home} />
  </Switch>
);
