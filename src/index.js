import { createHashHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "react-router-redux";

import AppContainer from "./components/AppContainer";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/Footer";
import Notification from "./components/Notification";
import Main from "./components/Main";
import store from "./store";
import "./services";

import "./style/index.scss";

// Just use hash history because our dashboard will be hosted deeply
export const history = createHashHistory();

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
