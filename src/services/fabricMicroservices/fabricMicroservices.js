import axios from "axios";
import { Actions, getState } from "jumpstate";

import { clearFabricIntervalIfNeeded, slugifyMicroservice } from "utils";
import { getFabricServer } from "utils/head";
import { reportError } from "services/notification";
import _ from "lodash";

const memoizedSlugifyMicroservice = _.memoize(slugifyMicroservice);

export function fetchFabricMicroservices(fabricServer) {
  if (fabricServer) {
    return axios
      .get(`${fabricServer}/services`, { responseType: "json" })
      .then(response => response.data)
      .then(arrayOfServices =>
        arrayOfServices.map(service => ({
          ...service,
          slug: memoizedSlugifyMicroservice(service.name, service.version)
        }))
      )
      .then(arrayOfServices =>
        arrayOfServices.reduce((result, service) => {
          result[service.slug] = service;
          return result;
        }, {})
      );
  } else {
    return Promise.reject("Invalid endpoint");
  }
}

/**
 * Async Jumpstate Effect that fetch services from the Fabric Server
 * and updates Redux based on success or error states
 * @param {any} [fabricServer=getState().settings.fabricServer]
 * @returns
 */
export function fetchAndStoreFabricMicroservicesEffect(
  fabricServer = getFabricServer()
) {
  if (!fabricServer) {
    console.log(
      "Fetching microservices failed because Discovery Service endpoint was missing"
    );
  } else {
    fetchFabricMicroservices(fabricServer)
      .then(results => Actions.fetchFabricMicroservicesSuccess(results))
      .catch(err => Actions.fetchFabricMicroservicesFailure(err));
  }
}

/**
 * Async Jumpstate Effect that handles successful fetches of services from the Fabric Server
 * Resets the failure counter and updates redux with the current services
 * @param {Object} services - Results object containing services
 * @param {number} [servicesPollingFailures=getState().fabric.servicesPollingFailures]
 */
export function fetchFabricMicroservicesSuccessEffect(
  services,
  servicesPollingFailures = getState().fabric.servicesPollingFailures
) {
  if (servicesPollingFailures > 0) {
    Actions.setServicesPollingFailures(0);
  }
  Actions.setFabricMicroservices(services);
}

/**
 * Action that handles errors when fetching services from a Fabric Server, notifying the user via a popup and the console
 * and incrementing a counter that disables the polling interval on repeat failures.
 * @param {Object} err - Error object
 */
export function fetchFabricMicroservicesFailureEffect(err) {
  const servicesPollingFailures = getState().fabric.servicesPollingFailures;
  console.log("Failed: ", servicesPollingFailures);
  // If there have already been four failures (0, 1, 2, 3, 4), this is the third failure,
  // so notify the user and stop polling
  if (servicesPollingFailures > 3) {
    reportError(
      "Automatically disabling the fetching of Fabric microservices after three attempts.",
      false,
      err
    );
    Actions.setServicesPollingFailures(0);
    Actions.stopPollingFabricMicroservices();
    // Otherwise just increment the counter and warn the user;
  } else {
    reportError("Fetching Fabric Microservices failed", true, err);
    Actions.setServicesPollingFailures(servicesPollingFailures + 1);
  }
}

/**
 * Async Jumpstate effect used to change the polling interval used to retrieve Fabric-wide
 * data from the Fabric Server
 * @param {number} interval - fabric polling interval
 */
export function changeFabricMicroservicesPollingIntervalEffect(interval) {
  Actions.stopPollingFabricMicroservices();
  Actions.setFabricPollingInterval(interval);
  Actions.startPollingFabricMicroservices();
}

/**
 * Action that starts a polling interval for retrieving services from the Fabric Server
 * @param {number} [interval=getState().fabric.fabricPollingInterval] - fabric polling interval
 */
export async function startPollingFabricMicroservicesEffect(
  {
    endpoint = getState().fabric.endpoint,
    interval = getState().fabric.fabricPollingInterval
  } = {
    endpoint: getState().fabric.endpoint,
    interval: getState().fabric.fabricPollingInterval
  }
) {
  // We need to make sure we clear any existing
  clearFabricIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setIsPollingFabric(true);
  // Perform an initial fetch
  Actions.fetchAndStoreFabricMicroservices();
  // And then start the interval
  window.refreshFabricIntervalID = setInterval(
    Actions.fetchAndStoreFabricMicroservices,
    interval
  );
}

/**
 * Action that clears the polling interval for metrics scraping
 */
export function stopPollingFabricMicroservicesEffect() {
  // We need to make sure we clear any existing intervals
  clearFabricIntervalIfNeeded();
  // Update Redux, so the UI components update
  Actions.setIsPollingFabric(false);
}

/**
 * Asyncronous Jumpstate Effect used to select a microservice instance
 * Because the dashboard only allows a single microservice instance to be selected and polled at any given time,
 * this clears the resets the polling interval and metrics cache each time a new microservice instance is selected
 * @param {Object} jumpstateObject
 * @param {string} jumpstateObject.instanceID
 * @param {string} jumpstateObject.serviceSlug
 */

export function selectInstanceEffect({ instanceID, serviceSlug }) {
  const { fabric } = getState();
  if (instanceID !== fabric.selectedInstanceID) {
    // Check if the new instance is a different microservice and update as needed
    if (serviceSlug && serviceSlug !== fabric.selectedServiceSlug) {
      Actions.setSelectedServiceSlug(serviceSlug);
    }
    Actions.setSelectedInstanceID(instanceID);
    // Stop Polling
    Actions.stopPollingInstanceMetrics();
    // Clear Metrics when we change instances
    Actions.clearMetrics();
    // and then start polling
    Actions.startPollingInstanceMetrics();
    // and then load dashboards
    const runtime =
      fabric && fabric.services && fabric.services[serviceSlug]
        ? fabric.services[serviceSlug].runtime
        : "";
    // Note: If we don't know the runtime we ran this function before getting a response from the Fabric server
    // so we don't know what type of runtime the microservice is
    // The current workaround for this issue is in componentWillReceiveProps in App
    if (runtime) {
      Actions.loadDashboardsFromJSON(runtime);
    }
  }
}
