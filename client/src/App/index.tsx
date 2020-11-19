import React from "react";
import { Routes } from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import theme from "../Theme";
import store from "../Redux";
import { MuiThemeProvider } from "@material-ui/core";

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  </MuiThemeProvider>
);
