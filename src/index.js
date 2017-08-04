// import { createBrowserHistory, createHashHistory } from "history";
import { createHashHistory } from "history";
import PromiseWorker from "promise-worker";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "react-router-redux";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import Container from "./components/Container";
import store from "./store";
// import { getBasename } from "./utils/head";
import AjaxWorker from "./workers/ajax.js";
import LocalStorageWorker from "./workers/localStorage.js";

import "./style/index.scss";

// Create a Web Worker and explicitly set reference as global variable
window.ajaxWorker = new PromiseWorker(new AjaxWorker());
window.localStorageWorker = new PromiseWorker(new LocalStorageWorker());

// load the UIKit Icon plugin
UIkit.use(Icons);

// Define a base URL for the project if REACT_APP_BASE_URL exists on process.env
// const basename = process.env.REACT_APP_BASE_URL ? `/${process.env.REACT_APP_BASE_URL}` : '/';

// Use browserHistory if available. Otherwise, fallback to hashHistory.

// Force Hash History
const createHistory = createHashHistory;
// const createHistory =
//   window.history && window.history.pushState
//     ? createBrowserHistory
//     : createHashHistory;
export const history = createHistory();
// export const history = createHistory({ basename: `${getBasename()}` });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Container />
    </Router>
  </Provider>,
  document.getElementById("root")
);
