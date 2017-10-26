import { createHashHistory } from "history";
import PromiseWorker from "promise-worker";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "react-router-redux";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { getFabricServer } from "./utils/head";

import Sidebar from "./components/Sidebar";

import AppContainer from "./components/AppContainer";
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

// Check if we are running with a Fabric Server or not
const fabricServer = getFabricServer();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppContainer>
        <Sidebar fabricServer={fabricServer} />
        <Main className="uk-width-5-6@s" fabricServer={fabricServer} />
      </AppContainer>
    </Router>
  </Provider>,
  document.getElementById("root")
);
