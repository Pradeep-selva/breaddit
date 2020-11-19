import React from "react";
import { Routes } from "../Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "../Redux";

export const App = () => (
  <div className='App'>
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  </div>
);
