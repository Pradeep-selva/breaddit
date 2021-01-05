import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteNames, RouteParams } from "../Configs";
import {
  ExpandedPost,
  Home,
  Login,
  NotFound,
  Signup,
  Subreaddit,
  TermsConditions,
  User
} from "../Pages";
import { AuthRoute } from "../Services";

export const Routes = () => (
  <Switch>
    <Route exact path={RouteNames.home} component={Home} />
    <Route
      exact
      path={`${RouteNames.sub}${RouteParams.id}`}
      component={Subreaddit}
    />
    <Route
      exact
      path={`${RouteNames.user}${RouteParams.id}`}
      component={User}
    />
    <Route
      exact
      path={`${RouteNames.post}${RouteParams.id}`}
      component={ExpandedPost}
    />
    <Route exact path={`${RouteNames.notFound}`} component={NotFound} />
    <Route exact path={RouteNames.tc} component={TermsConditions} />
    <AuthRoute exact path={RouteNames.login} component={Login} />
    <AuthRoute exact path={RouteNames.signup} component={Signup} />
  </Switch>
);
