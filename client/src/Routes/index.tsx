import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "../Pages";
import { AuthRoute } from "../Services";

export const Routes = () => (
  <Switch>
    <Route exact path={"/"} component={Home} />
    <AuthRoute exact path={"/login"} component={Home} />
  </Switch>
);
