import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./AppHistory";

import AppContainer from "./components/AppContainer";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/Footer";
import Notification from "./components/Notification";
import Main from "./components/Main";
import store from "./store";
import "./services";
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer>
        <Notification />
        <AppHeader />
        <Main />
        <AppFooter />
      </AppContainer>
    </Router>
  </Provider>,
  document.getElementById("root")
);
