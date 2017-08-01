import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory, createHashHistory } from "history";
import { ConnectedRouter as Router } from "react-router-redux";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import registerServiceWorker from "./registerServiceWorker";
import Container from "./components/Container";
import store from "./store";
import { getBasename } from "./utils";

// Import root scss file, which includes the UIKit css and our custom theme
import "./style/index.scss";

// load the UIKit Icon plugin
UIkit.use(Icons);

// Define a base URL for the project if REACT_APP_BASE_URL exists on process.env
// const basename = process.env.REACT_APP_BASE_URL ? `/${process.env.REACT_APP_BASE_URL}` : '/';

// Use browserHistory if available. Otherwise, fallback to hashHistory.

const createHistory =
  window.history && window.history.pushState
    ? createBrowserHistory
    : createHashHistory;
export const history = createHistory({ basename: `${getBasename()}` });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Container />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

// <Route component={Container} path="/">
