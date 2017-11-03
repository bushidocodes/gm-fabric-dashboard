import { createHashHistory } from "history";
import PromiseWorker from "promise-worker";
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

// All scripts in the workers directory are loaded by WebPack via worker-loader
import AjaxWorker from "./workers/ajax.js";
// Disabled LocalStorage Worker for initial release
// import LocalStorageWorker from "./workers/localStorage.js";

import "./style/index.scss";

// Create a Web Worker and explicitly set reference as global variable
window.ajaxWorker = new PromiseWorker(new AjaxWorker());
// localStorage functionality is disabled for the initial release
// window.localStorageWorker = new PromiseWorker(new LocalStorageWorker());

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
