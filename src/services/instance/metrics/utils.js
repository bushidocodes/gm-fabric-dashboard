import { getState } from "jumpstate";
import { getFabricServer } from "utils/head";

export function buildDiscoveryServiceInstanceMetricsEndpoint() {
  const {
    fabric: {
      fabricServer = getFabricServer(),
      selectedServiceSlug,
      selectedInstanceID,
      services
    }
  } = getState();
  const { name, version } = services[selectedServiceSlug];
  return `${fabricServer}/metrics/${name}/${version}/${selectedInstanceID}`;
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
