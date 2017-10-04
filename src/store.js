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
import {
  clearInstanceIntervalIfNeeded,
  clearFabricIntervalIfNeeded
} from "./utils";
import { getRuntime, getThreadsEndpoint, getFabricServer } from "./utils/head";
import defaultJVMDashboards from "./json/jvm/dashboards.json";
import defaultGoDashboards from "./json/go/dashboards.json";

/**
 * Async Jumpstate Effect that instructs AJAX Worker to fetch services from the Fabric Server
 * @param {any} [fabricServer=getState().settings.fabricServer]
 * @returns
 */
function fetchServicesEffect(fabricServer = getState().settings.fabricServer) {
  if (!fabricServer) {
    return;
  }
  window.ajaxWorker
    .postMessage({
      type: "fetchServices",
      fabricServer: fabricServer
    })
    .then(results => Actions.fetchServicesSuccess(results))
    .catch(err => Actions.fetchServicesFailure(err));
}
Effect("fetchServices", fetchServicesEffect);

/**
 * Async Jumpstate Effect that handles successful fetches of services from the Fabric Server
 * Resets the failure counter and updates redux with the current services
 * @param {Object} services - Results object containing services
 * @param {number} [servicesPollingFailures=getState().settings.servicesPollingFailures]
 */
function fetchServicesSuccessEffect(
  services,
  servicesPollingFailures = getState().settings.servicesPollingFailures
) {
  if (servicesPollingFailures > 0) {
    Actions.setServicesPollingFailures(0);
  }
  Actions.setServices(services);
}
Effect("fetchServicesSuccess", fetchServicesSuccessEffect);

/**
 * Action that handles errors when fetching services from a Fabric Server, notifying the user via a popup and the console
 * and incrementing a counter that disables the polling interval on repeat failures.
 * @param {Object} err - Error object
 */
function fetchServicesFailureEffect(err) {
  const servicesPollingFailures = getState().settings.servicesPollingFailures;
  console.log("Failed: ", servicesPollingFailures);
  // If there have already been four failures (0, 1, 2, 3, 4), this is the third failure,
  // so notify the user and stop polling
  if (servicesPollingFailures > 3) {
    notification(
      "Automatically disabling the fetching of services after three attempts.", //TODO: Add settings config for services polling
      {
        status: "danger",
        timeout: 86400000
      }
    );
    Actions.setServicesPollingFailures(0);
    Actions.stopPollingFabric();
    // Otherwise just increment the counter and warn the user;
  } else {
    notification("Fetching Services failed", { status: "danger" });
    console.log("Fetching Services failed", err);
    Actions.setServicesPollingFailures(servicesPollingFailures + 1);
  }
}
Effect("fetchServicesFailure", fetchServicesFailureEffect);

/**
 * Async Jumpstate effect used to change the polling interval used to retrieve Fabric-wide
 * data from the Fabric Server
 * @param {number} interval - fabric polling interval
 */
function changeFabricPollingIntervalEffect(interval) {
  Actions.stopPollingFabric();
  Actions.setFabricPollingInterval(interval);
  Actions.startPollingFabric();
}
Effect("changeFabricPollingInterval", changeFabricPollingIntervalEffect);

/**
 * Action that starts a polling interval for retrieving services from the Fabric Server
 * @param {number} [interval=getState().settings.fabricPollingInterval] - fabric polling interval
 */
function startPollingFabricEffect(
  interval = getState().settings.fabricPollingInterval
) {
  // We need to make sure we clear any existing
  clearFabricIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setFabricPolling(true);
  // Perform an initial fetch
  Actions.fetchServices();
  // And then start the interval
  window.refreshFabricIntervalID = setInterval(Actions.fetchServices, interval);
}
Effect("startPollingFabric", startPollingFabricEffect);

/**
 * Action that clears the polling interval for metrics scraping
 */
function stopPollingFabricEffect() {
  // We need to make sure we clear any existing intervals
  clearFabricIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setFabricPolling(false);
}
Effect("stopPollingFabric", stopPollingFabricEffect);

/**
 * Asyncronous Jumpstate Effect used to select a microservice instance
 * Because the dashboard only allows a single microservice instance to be selected and polled at any given time,
 * this clears the resets the polling interval and metrics cache each time a new microservice instance is selected
 * @param {Object} jumpstateObject
 * @param {string} jumpstateObject.instanceID
 * @param {string} jumpstateObject.serviceName
 */
function selectInstanceEffect({ instanceID, serviceName, serviceVersion }) {
  const { fabric, settings } = getState();
  if (instanceID !== settings.selectedInstance) {
    // Check if the new instance is a different microservice and update as needed
    if (serviceName && serviceName !== settings.selectedService) {
      Actions.setSelectedService(serviceName);
    }
    if (serviceVersion && serviceVersion !== settings.selectedServiceVersion) {
      Actions.setSelectedServiceVersion(serviceVersion);
    }
    Actions.setSelectedInstance(instanceID);
    // Stop Polling
    Actions.stopPollingInstance();
    // Clear Metrics when we change instances
    Actions.clearMetrics();
    // and then start polling
    Actions.startPollingInstanceWithServer(instanceID);
    // and then load dashboards
    const runtime =
      fabric &&
      fabric.services &&
      fabric.services[`${serviceName}|${serviceVersion}`]
        ? fabric.services[`${serviceName}|${serviceVersion}`].runtime
        : "";
    // Note: If we don't know the runtime we ran this function before getting a response from the Fabric server
    // so we don't know what type of runtime the microservice is
    // The current workaround for this issue is in componentWillReceiveProps in App
    if (runtime) {
      Actions.loadDashboardsFromJSON(runtime);
    }
  }
}
Effect("selectInstance", selectInstanceEffect);

/**
 * Action that checks if we have a fabric server and calls the appropriate function to fetch metrics
 * @param {any} arg - an arbitrary argument of an unknown type that is passed through to fetchMetricsWithServer or fetchMetricsWithoutServer
 */
function fetchMetricsEffect(arg) {
  const fabricServer = getState().settings.fabricServer;
  if (fabricServer) {
    Actions.fetchMetricsWithServer(arg);
  } else {
    Actions.fetchMetricsWithoutServer(arg);
  }
}
Effect("fetchMetrics", fetchMetricsEffect);

/**
 * Async Jumpstate Effect that instructs the AJAX worker to fetchMetricsWithoutServer and calls success or failure actions
 * depending on if the PromiseWorker resolves or rejects
 * @param {string} endpoint - a string containing the target URL of the metrics endpoint
 * @returns
 */
function fetchMetricsWithoutServerEffect(endpoint) {
  if (!endpoint) return;
  window.ajaxWorker
    .postMessage({
      type: "fetchMetricsWithoutServer",
      runtime: getRuntime(),
      endpoint: endpoint
    })
    .then(json => Actions.fetchMetricsSuccess(json))
    .catch(err => Actions.fetchMetricsFailure(err));
}
Effect("fetchMetricsWithoutServer", fetchMetricsWithoutServerEffect);

/**
 * Async Jumpstate Effect that instructs the AJAX worker to fetchMetricsWithServer and calls success or failure actions
 * depending on if the PromiseWorker resolves or rejects the promise
 * @param {string} [instanceID=getState().settings.instanceID]
 * @returns
 */
function fetchMetricsWithServerEffect(
  instanceID = getState().settings.instanceID
) {
  const fabricServer = getState().settings.fabricServer || getFabricServer();
  const service = getState().settings.selectedService || "";
  const version = getState().settings.selectedServiceVersion || "";
  if (!fabricServer || !instanceID) return;
  window.ajaxWorker
    .postMessage({
      type: "fetchMetricsWithServer",
      fabricServer,
      service,
      version,
      instanceID
    })
    .then(json => Actions.fetchMetricsSuccess(json))
    .catch(err => Actions.fetchMetricsFailure(err));
}
Effect("fetchMetricsWithServer", fetchMetricsWithServerEffect);

/**
 * Async Jumpstate Effect that handles successful fetches of metrics from the Fabric Server
 * Resets the failure counter and updates redux with the current metrics object
 *
 * @param {Object} metrics
 */
function fetchMetricsSuccessEffect(metrics) {
  if (getState().settings.metricsPollingFailures > 0) {
    Actions.setMetricsPollingFailures(0);
  }
  Actions.setMetrics(metrics);
}
Effect("fetchMetricsSuccess", fetchMetricsSuccessEffect);

/**
 * Action that handles fetch thread errors, notifying the user via a popup and the console
 * and incrementing a counter that disables the polling interval on repeat failures.
 * @param {Object} err
 */
function fetchMetricsFailureHandler(err) {
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
    Actions.stopPollingInstance();
    // Otherwise just increment the counter and warn the user;
  } else {
    notification("Fetching Metrics failed", { status: "danger" });
    console.log("Fetching Metrics failed", err);
    Actions.setMetricsPollingFailures(metricsPollingFailures + 1);
  }
}
Effect("fetchMetricsFailure", fetchMetricsFailureHandler);

/**
 * Action that fetches threads information (JVM) and stores in Redux
 * @param {string} [endpoint=getThreadsEndpoint()]
 * @returns
 */
function fetchThreadsEffect(endpoint = getThreadsEndpoint()) {
  if (!endpoint) return;
  window.ajaxWorker
    .postMessage({
      type: "fetchThreads",
      endpoint: endpoint
    })
    .then(json => Actions.fetchThreadsSuccess(json))
    .catch(err => Actions.fetchThreadsFailure(err));
}
Effect("fetchThreads", fetchThreadsEffect);

/**
 * Action that handles fetch thread errors, notifying the user via a popup and the console
 * @param {Object} err
 */
function fetchThreadsFailureEffect(err) {
  notification("Fetching Threads Data failed", { status: "danger" });
  console.log("Fetching Threads failed", err);
}
Effect("fetchThreadsFailure", fetchThreadsFailureEffect);

/**
 * Action that checks if we have a fabric server and calls the appropriate polling function
 * @param {any} args
 */
function startPollingInstanceEffect(args) {
  Actions.setInstancePolling(true);
  const fabricServer = getState().settings.fabricServer;
  if (fabricServer) {
    Actions.startPollingInstanceWithServer(args);
  } else {
    Actions.startPollingInstanceWithoutServer(args);
  }
}
Effect("startPollingInstance", startPollingInstanceEffect);

/**
 * Action that starts a polling interval for scraping metrics directly
 * @param {Object} [{
 *     endpoint = getState().settings.metricsEndpoint,
 *     interval = getState().settings.instancePollingInterval
 *   }={}]
 */
function startPollingInstanceWithoutServerEffect(
  {
    endpoint = getState().settings.metricsEndpoint,
    interval = getState().settings.instancePollingInterval
  } = {}
) {
  // We need to make sure we clear any existing
  clearInstanceIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setInstancePolling(true);
  // Perform an initial fetch
  Actions.fetchMetrics(endpoint);
  // And then start the interval
  window.refreshMetricsIntervalID = setInterval(
    Actions.fetchMetricsWithoutServer,
    interval,
    endpoint
  );
}

Effect(
  "startPollingInstanceWithoutServer",
  startPollingInstanceWithoutServerEffect
);

/**
 * Action that starts a polling interval for scraping metrics indirectly via a Fabric Server
 * @param {Object} [{
 *     instanceID = getState().settings.selectedInstance,
 *     interval = getState().settings.instancePollingInterval
 *   }={}]
 */
function startPollingInstanceWithServerEffect(
  {
    instanceID = getState().settings.selectedInstance,
    interval = getState().settings.instancePollingInterval
  } = {}
) {
  // We need to make sure we clear any existing
  clearInstanceIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setInstancePolling(true);
  // Perform an initial fetch
  Actions.fetchMetricsWithServer(instanceID);
  // And then start the interval
  window.refreshMetricsIntervalID = setInterval(
    Actions.fetchMetricsWithServer,
    interval,
    instanceID
  );
}
Effect("startPollingInstanceWithServer", startPollingInstanceWithServerEffect);

/**
 * Action that clears the polling interval for metrics scraping
 */
function stopPollingInstanceEffect() {
  // We need to make sure we clear any existing intervals
  clearInstanceIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setInstancePolling(false);
}
Effect("stopPollingInstance", stopPollingInstanceEffect);

/**
 * Async Jumpstate effect used to change the polling interval
 * @param {number} interval
 */
function changeInstancePollingIntervalEffect(interval) {
  Actions.stopPollingInstance();
  Actions.setInstancePollingInterval(interval);

  if (getState().settings.fabricServer) {
    if (getState().settings.selectedInstance) {
      Actions.startPollingInstanceWithServer();
    }
  } else {
    Actions.startPollingInstance({
      interval: getState().settings.instancePollingInterval
    });
  }
}
Effect("changeInstancePollingInterval", changeInstancePollingIntervalEffect);

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
 * @param {string} [runtime=getRuntime()]
 * @returns
 */
function loadDashboardsFromJSONEffect(runtime = getRuntime()) {
  // Check runtime and pass the runtime appropriate JSON file to Actions.updateDashboardsRedux
  switch (runtime) {
    case "JVM":
      return Actions.updateDashboardsRedux(defaultJVMDashboards);
    case "GO":
      return Actions.updateDashboardsRedux(defaultGoDashboards);
    default:
      return;
  }
}
Effect("loadDashboardsFromJSON", loadDashboardsFromJSONEffect);

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
