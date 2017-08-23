import _ from "lodash";
import {
  Effect,
  Actions,
  Hook,
  getState,
  CreateJumpstateMiddleware
} from "jumpstate";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { notification } from "uikit";

import { history } from "./index";
import metrics from "./jumpstate/metrics";
import settings from "./jumpstate/settings";
import threadsTable from "./jumpstate/threadsTable";
import dashboards from "./jumpstate/dashboards";
import { getRuntime, getThreadsEndpoint } from "./utils/head";

// Effects / Asynchronous Actions

/**
 * Async Action that fetches metrics and calls success or failure actions.
 * endpoint is an string containing the target URL of the metrics endpoint
 */
Effect("fetchMetrics", endpoint => {
  if (!endpoint) return;
  window.ajaxWorker
    .postMessage({
      type: "fetchMetrics",
      runtime: getRuntime(),
      endpoint: endpoint
    })
    .then(json => Actions.fetchMetricsSuccess(json))
    .catch(err => Actions.fetchMetricsFailure(err));
});

/**
 * Action that handles fetch thread errors, notifying the user via a popup and the console
 * and incrementing a counter that disables the polling interval on repeat failures.
 */
Effect("fetchMetricsFailure", err => {
  notification("Fetching Metrics failed", { status: "danger" });
  console.log("Fetching Metrics failed", err);
  Actions.incrementPollingFailures();
});

/**
 * Action that fetches threads information (JVM) and stores in Redux
 */
Effect("fetchThreads", (endpoint = getThreadsEndpoint()) => {
  if (!endpoint) return;
  window.ajaxWorker
    .postMessage({
      type: "fetchThreads",
      endpoint: endpoint
    })
    .then(json => Actions.fetchThreadsSuccess(json))
    .catch(err => Actions.fetchThreadsFailure(err));
});

/**
 * Action that handles fetch thread errors, notifying the user via a popup and the console
 */
Effect("fetchThreadsFailure", err => {
  notification("Fetching Threads Data failed", { status: "danger" });
  console.log("Fetching Threads failed", err);
});

/**
 * Action that starts a polling interval for scraping metrics, overwriting if needed
 */
Effect("startPolling", function({ endpoint, interval }) {
  const refreshMetricsFunctionFactory = endpoint => () => {
    if (endpoint) Actions.fetchMetrics(endpoint);
  };
  window.refreshMetricsInterval = window.setInterval(
    refreshMetricsFunctionFactory(endpoint),
    interval
  );
});

/**
 * Action that clears the polling interval for metrics scraping
 */
Effect("stopPolling", (endpoint, interval) => {
  clearInterval(window.refreshMetricsInterval);
});

/**
 * Synchronous action that performs initial setup of localforage
 */
Effect("initLocalStorage", () => {
  return window.localStorageWorker
    .postMessage({
      type: "init",
      runtime: getRuntime(),
      basename: window.location.href.split("#")[0] //everything up to the hash
    })
    .catch(err => console.error(err));
});

/**
 * Asynchronous action that fetches dashboards from localforage if they exist
 * and falls back to the default dashboards if not found
 */
Effect("getDashboards", () => {
  window.localStorageWorker
    .postMessage({
      type: "getDashboards",
      runtime: getRuntime()
    })
    .then(dashboards => Actions.updateDashboardsRedux(dashboards))
    .catch(err => console.log("getDashboards failed with ", err));
});

/**
 * Asynchronous action that takes an updated dashboard, merges it into the dashboards
 * object and then writes it to Redux and local storage
 */
Effect("setDashboard", updatedDashboard => {
  const dashboards = _.merge({}, getState().dashboards, updatedDashboard);
  window.localStorageWorker
    .postMessage({
      type: "setDashboards",
      runtime: getRuntime(),
      dashboards
    })
    .then(dashboards => Actions.updateDashboardsRedux(dashboards))
    .catch(err =>
      console.log("Failed to persist dashboards to local storage: ", err)
    );
});

/**
 * Asynchronous action that clears all dashboard state from Redux and Local Storage,
 * forcing the defaults to reload.
 */
Effect("setDashboardsToDefault", () => {
  window.localStorageWorker
    .postMessage({
      type: "setDashboardsToDefault",
      runtime: getRuntime()
    })
    .then(dashboards => Actions.updateDashboardsRedux(dashboards))
    .catch(err =>
      console.log("Failed to persist dashboards to local storage: ", err)
    );
});

// Hooks

// Automatically start polling the default endpoint using the default interval on initial page load.
Hook((action, getState) => {
  if (!getState().settings.pollingHasInitialized) {
    Actions.setPollingAsInitialized();
    Actions.startPolling({
      endpoint: getState().settings.metricsEndpoint,
      interval: getState().settings.interval
    });
  }
});

// Clear the interval when an action sets state.settings.isPolling to false
Hook((action, getState) => {
  if (action.type === "togglePolling" && !getState().settings.isPolling) {
    Actions.stopPolling();
  }
});

// Stop polling after three failures and reset failure counter
// The Notification will persist for 24 hours unless manually dismissed by the user.
Hook((action, getState) => {
  const pollingFailures = getState().settings.pollingFailures;
  if (action.type === "fetchMetricsSuccess" && pollingFailures > 0) {
    Actions.resetPollingFailures();
  } else if (getState().settings.pollingFailures > 2) {
    notification(
      "Automatically disabling the fetching of metrics after three attempts. You can turn polling back on in Settings.",
      {
        status: "danger",
        timeout: 86400000
      }
    );
    Actions.resetPollingFailures();
    Actions.togglePolling();
  }
});

// Start the interval when an action sets state.settings.isPolling to true
Hook((action, getState) => {
  if (action.type === "togglePolling" && getState().settings.isPolling) {
    Actions.startPolling({
      endpoint: getState().settings.metricsEndpoint,
      interval: getState().settings.interval
    });
  }
});

// Stop the interval, change the endpoint, and restart when state.settings.interval is changed while polling is live
Hook((action, getState) => {
  if (action.type === "setInterval") {
    Actions.stopPolling();
    Actions.startPolling({
      endpoint: getState().settings.metricsEndpoint,
      interval: getState().settings.interval
    });
  }
});

// Persist dashboards to localStorage
Hook((action, getState) => {
  if (action.type === "setInterval") {
    Actions.stopPolling();
    Actions.startPolling({
      endpoint: getState().settings.metricsEndpoint,
      interval: getState().settings.interval
    });
  }
});

// Prepare Redux Middlewares
const middlewares = [];
middlewares.push(CreateJumpstateMiddleware());
middlewares.push(routerMiddleware(history));
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

// Create the Redux store using reducers and middlewares
export default createStore(
  combineReducers({
    metrics,
    settings,
    threadsTable,
    dashboards,
    routing: routerReducer
  }),
  applyMiddleware(...middlewares)
);
