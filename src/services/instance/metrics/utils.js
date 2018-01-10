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
 * Clears the interval with the ID stored at window.refreshInstanceMetricsIntervalID and then
 * wipes window.refreshMetricsIntervalID
 */
export function clearInstanceMetricsPollingIntervalIfNeeded() {
  if (window.refreshInstanceMetricsPollingInterval) {
    clearInterval(window.refreshInstanceMetricsPollingInterval);
    window.refreshInstanceMetricsPollingInterval = null;
  }
}
