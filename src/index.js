import { createHashHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "react-router-redux";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import AppContainer from "./components/AppContainer";
import Header from "./components/AppHeader";
import AppFooter from "./components/Footer";
import Main from "./components/Main";
import store from "./store";
import "./services";

import "./style/index.scss";
// load the UIKit Icon plugin
UIkit.use(Icons);

// Just use hash history because our dahsboard will be hosted deeply
export const history = createHashHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer>
        <Header />
        <Main />
        <AppFooter />
      </AppContainer>
    </Router>
  </Provider>,
  document.getElementById("root")
);
