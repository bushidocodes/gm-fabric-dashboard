// Commented out imports are used by currently disabled local storage functionality
// import _ from "lodash";

import {
  Effect,
  Actions,
  getState,
  CreateJumpstateMiddleware
} from "jumpstate";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { notification } from "uikit";

import { history } from "./index";
import fabric from "./jumpstate/fabric";
import metrics from "./jumpstate/metrics";
import settings from "./jumpstate/settings";
import threadsTable from "./jumpstate/threadsTable";
import dashboards from "./jumpstate/dashboards";
import { clearIntervalIfNeeded } from "./utils";
import { getRuntime, getThreadsEndpoint, getFabricServer } from "./utils/head";
import defaultJVMDashboards from "./json/jvm/dashboards.json";
import defaultGolangDashboards from "./json/golang/dashboards.json";

/**
 * Async Jumpstate Effect that instructs AJAX Worker to fetch services from the Fabric Server
 */
Effect(
  "fetchServicesFromServer",
  (fabricServer = getState().settings.fabricServer) => {
    if (!fabricServer) {
      return;
    }
    window.ajaxWorker
      .postMessage({
        type: "fetchServicesFromServer",
        fabricServer: fabricServer
      })
      .then(results => Actions.fetchServicesSuccess(results))
      .catch(err => console.log("ERR:", err));
    // TODO: Add feedback to user if server is not available.
  }
);

/**
 * Asyncronous Jumpstate Effect used to select a microservice instance
 * Because the dashboard only allows a single microservice instance to be selected and polled at any given time,
 * this clears the resets the polling interval and metrics cache each time a new microservice instance is selected
 */
Effect("selectInstance", ({ instanceID, serviceName }) => {
  const { fabric, settings } = getState();
  if (instanceID !== settings.selectedInstance) {
    // Check if the new instances is a different microservice and update as needed
    if (serviceName && serviceName !== settings.selectedService) {
      Actions.setSelectedService(serviceName);
    }
    Actions.setSelectedInstance(instanceID);
    // Stop Polling
    Actions.stopPolling();
    // Clear Metrics when we change instances
    Actions.clearMetrics();
    // and then start polling
    Actions.startPollingWithServer(instanceID);
    // and then load dashboards
    // TODO: Pass runtime
    const runtime =
      fabric && fabric.services && fabric.services[serviceName]
        ? fabric.services[serviceName].runtime
        : "";
    // Note: If we don't know the runtime we ran this function before getting a response from the Fabric server
    // so we don't know what type of runtime the microservice is
    // The current workaround for this issue is in componentWillReceiveProps in App
    if (runtime) {
      Actions.loadDashboardsFromJSON(runtime);
    }
  }
});

/**
 * Action that checks if we have a fabric server and calls the appropriate function to fetch metrics
 * 
 * Arguments:
 * - arg - an arbitrary argument of an unknown type that is passed through to fetchMetricsWithServer or fetchMetricsWithoutServer
 */
Effect("fetchMetrics", arg => {
  const fabricServer = getState().settings.fabricServer;
  if (fabricServer) {
    Actions.fetchMetricsWithServer(arg);
  } else {
    Actions.fetchMetricsWithoutServer(arg);
  }
});

/**
 * Async Jumpstate Effect that instructs the AJAX worker to fetchMetricsWithoutServer and calls success or failure actions
 * depending on if the PromiseWorker resolves or rejects
 * 
 * Arguments:
 * - endpoint - a string containing the target URL of the metrics endpoint
 */
Effect("fetchMetricsWithoutServer", endpoint => {
  if (!endpoint) return;
  window.ajaxWorker
    .postMessage({
      type: "fetchMetricsWithoutServer",
      runtime: getRuntime(),
      endpoint: endpoint
    })
    .then(json => Actions.fetchMetricsSuccess(json))
    .catch(err => Actions.fetchMetricsFailure(err));
});

/**
 * Async Jumpstate Effect that instructs the AJAX worker to fetchMetricsWithServer and calls success or failure actions
 * depending on if the PromiseWorker resolves or rejects
 * 
 * Arguments:
 * - endpoint - a string containing the target URL of the metrics endpoint
 */
Effect(
  "fetchMetricsWithServer",
  (instanceID = getState().settings.instanceID) => {
    const fabricServer = getState().settings.fabricServer || getFabricServer();
    if (!fabricServer || !instanceID) return;
    window.ajaxWorker
      .postMessage({
        type: "fetchMetricsWithServer",
        fabricServer: fabricServer,
        instanceID: instanceID
      })
      .then(json => Actions.fetchMetricsSuccess(json))
      .catch(err => Actions.fetchMetricsFailure(err));
  }
);

Effect("fetchMetricsSuccess", metrics => {
  if (getState().settings.metricsPollingFailures > 0) {
    Actions.setMetricsPollingFailures(0);
  }
  Actions.setMetrics(metrics);
});

/**
 * Action that handles fetch thread errors, notifying the user via a popup and the console
 * and incrementing a counter that disables the polling interval on repeat failures.
 * 
 * Arguments:
 * - err - An error
 */
Effect("fetchMetricsFailure", err => {
  const metricsPollingFailures = getState().settings.metricsPollingFailures;
  console.log("Failed: ", metricsPollingFailures);
  // If there have already been four failures (0, 1, 2, 3, 4), this is the third failure,
  // so notify the user and stop polling
  if (metricsPollingFailures > 3) {
    notification(
      "Automatically disabling the fetching of metrics after three attempts. You can turn polling back on in Settings.",
      {
        status: "danger",
        timeout: 86400000
      }
    );
    Actions.setMetricsPollingFailures(0);
    Actions.stopPolling();
    // Otherwise just increment the counter and warn the user;
  } else {
    notification("Fetching Metrics failed", { status: "danger" });
    console.log("Fetching Metrics failed", err);
    Actions.setMetricsPollingFailures(metricsPollingFailures + 1);
  }
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
 * Action that checks if we have a fabric server and calls the appropriate polling function
 */
Effect("startPolling", args => {
  console.log("startPolling");
  Actions.setPolling(true);
  const fabricServer = getState().settings.fabricServer;
  if (fabricServer) {
    Actions.startPollingWithServer(args);
  } else {
    Actions.startPollingWithoutServer(args);
  }
});

/**
 * Action that starts a polling interval for scraping metrics directly
 */
Effect("startPollingWithoutServer", function({
  endpoint = getState().settings.metricsEndpoint,
  interval = getState().settings.interval
}) {
  console.log("startPollingWithoutServer", endpoint, interval);
  // We need to make sure we clear any existing
  clearIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setPolling(true);
  // Perform an initial fetch
  Actions.fetchMetrics(endpoint);
  // And then start the interval
  window.refreshMetricsIntervalID = setInterval(
    Actions.fetchMetricsWithoutServer,
    interval,
    endpoint
  );
});

/**
 * Action that starts a polling interval for scraping metrics indirectly via a Fabric Server
 */
Effect("startPollingWithServer", function({
  instanceID = getState().settings.selectedInstance,
  interval = getState().settings.interval
}) {
  // We need to make sure we clear any existing
  clearIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setPolling(true);
  // Perform an initial fetch
  Actions.fetchMetricsWithServer(instanceID);
  // And then start the interval
  window.refreshMetricsIntervalID = setInterval(
    Actions.fetchMetricsWithServer,
    interval,
    instanceID
  );
});

/**
 * Action that clears the polling interval for metrics scraping
 */
Effect("stopPolling", (endpoint, interval) => {
  // We need to make sure we clear any existing intervals
  clearIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setPolling(false);
});

/**
 * Async Jumpstate effect used to change the polling interval 
 */
Effect("changeInterval", interval => {
  Actions.stopPolling();
  Actions.setInterval(interval);

  if (getState().settings.fabricServer) {
    Actions.startPollingWithServer();
  } else {
    Actions.startPolling({
      interval: getState().settings.interval
    });
  }
});

// Note: the following methods are disabled to bypass use of local forage for the initial release

/**
 * Synchronous action that performs initial setup of localforage
 */
// Effect("initLocalStorage", () => {
//   return window.localStorageWorker
//     .postMessage({
//       type: "init",
//       runtime: getRuntime(),
//       basename: window.location.href.split("#")[0] //everything up to the hash
//     })
//     .catch(err => console.error(err));
// });

/**
 * Asynchronous action that fetches dashboards from localforage if they exist
 * and falls back to the default dashboards if not found
 */
// Effect("getDashboards", () => {
//   window.localStorageWorker
//     .postMessage({
//       type: "getDashboards",
//       runtime: getRuntime()
//     })
//     .then(dashboards => Actions.updateDashboardsRedux(dashboards))
//     .catch(err => console.log("getDashboards failed with ", err));
// });

/**
 * Asynchronous action that takes an updated dashboard, merges it into the dashboards
 * object and then writes it to Redux and local storage
 */
// Effect("setDashboard", updatedDashboard => {
//   const dashboards = _.merge({}, getState().dashboards, updatedDashboard);
//   window.localStorageWorker
//     .postMessage({
//       type: "setDashboards",
//       runtime: getRuntime(),
//       dashboards
//     })
//     .then(dashboards => Actions.updateDashboardsRedux(dashboards))
//     .catch(err =>
//       console.log("Failed to persist dashboards to local storage: ", err)
//     );
// });

/**
 * Asynchronous action that clears all dashboard state from Redux and Local Storage,
 * forcing the defaults to reload.
 */
// Effect("setDashboardsToDefault", () => {
//   window.localStorageWorker
//     .postMessage({
//       type: "setDashboardsToDefault",
//       runtime: getRuntime()
//     })
//     .then(dashboards => Actions.updateDashboardsRedux(dashboards))
//     .catch(err =>
//       console.log("Failed to persist dashboards to local storage: ", err)
//     );
// });

/**
 * This effect is a temporary alternative to directly load the dashboard JSON without use of the
 * localStorage worker. The intended use of this Effect is to disable local forage functionality
 * during the initial release
 */
Effect("loadDashboardsFromJSON", (runtime = getRuntime()) => {
  // Check runtime and pass the runtime appropriate JSON file to Actions.updateDashboardsRedux
  switch (runtime) {
    case "JVM":
      return Actions.updateDashboardsRedux(defaultJVMDashboards);
    case "GOLANG":
      return Actions.updateDashboardsRedux(defaultGolangDashboards);
    default:
      return;
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
    fabric,
    metrics,
    settings,
    threadsTable,
    dashboards,
    routing: routerReducer
  }),
  applyMiddleware(...middlewares)
);
