import { getState } from "jumpstate";
import { getFabricServer } from "utils/head";

export function buildDiscoveryServiceInstanceMetricsEndpoint(
  fabricServer = getState().fabric.fabricServer || getFabricServer(),
  service = getState().fabric.selectedService || "",
  version = getState().fabric.selectedServiceVersion || "",
  instanceID = getState().fabric.selectedInstance
) {
  return `${fabricServer}/metrics/${service}/${version}/${instanceID}`;
}

/**
 * Utility function to convert a native statsd formatted endpoint into the flat
 * object of key-value pairs that we expect
 * A statsd file contains is key value pairs delimited by a colon and terminated by \n
 * @param {*} statsdText 
 */
export function formatStatsd(statsdText) {
  let results = {};
  statsdText
    .split("\n")
    .map(kv => kv.split(": "))
    .forEach(([key, value]) => {
      if (key && value) {
        // Cast to a number and filter out NaNs
        const valueAsNumber = Number(value);
        if (!Number.isNaN(valueAsNumber)) {
          results[key] = Number(value);
        }
      }
    });
  return results;
}

/**
 * Clears the interval with the ID stored at window.refreshInstanceMetricsIntervalID and then
 * wipes window.refreshMetricsIntervalID
 */
export function clearInstanceMetricsPollingIntervalIfNeeded() {
  if (window.refreshInstanceMetricsPollingInterval) {
    clearInterval(window.refreshInstanceMetricsPollingInterval);
    window.refreshInstanceMetricsPollingInterval = null;
  }
}
