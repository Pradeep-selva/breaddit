import React, { useEffect } from "react";
import { checkUserAuthentication } from "../Services";
import { Routes } from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import theme from "../Theme";
import store from "../Redux";
import { MuiThemeProvider } from "@material-ui/core";
import { Navbar, ScrollUpButton } from "../Components";
import "./App.css";

export const App = () => {
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  console.log(process.env.NODE_ENV);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes />
          <ScrollUpButton />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
