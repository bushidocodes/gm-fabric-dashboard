import { State } from "jumpstate";

import {
  getFabricServer,
  getRuntime,
  getMetricsEndpoint,
  getThreadsEndpoint
} from "../utils/head";

// Initial state is determined by whether a fabric server has been configured or
// not. If the server has been configured, then metricsEndpoint, threadsEndpoint,
// and runtime are set to null and will be later set by the response from the
// fabric server. If the server has not been configured, the values are assumed
// to be statically configured in the index.html head and populated immediately.
const settings = State({
  initial: {
    fabricServer: getFabricServer(),
    isPollingFabric: false,
    isPollingInstance: false,
    instancePollingInterval: 5000,
    fabricPollingInterval: 5000,
    metricsEndpoint: !getFabricServer() ? getMetricsEndpoint() : null,
    metricsPollingFailures: 0,
    runtime: !getFabricServer() ? getRuntime() : null,
    selectedInstance: null,
    selectedService: null,
    servicesPollingFailures: 0,
    threadsEndpoint: !getFabricServer() ? getThreadsEndpoint() : null,
    threadsFilter: "all"
  },
  setFabricServer(state, payload) {
    return { ...state, fabricServer: payload };
  },
  setInstancePollingInterval(state, payload) {
    return { ...state, instancePollingInterval: payload };
  },
  setInstancePolling(state, payload) {
    return { ...state, isPollingInstance: payload };
  },
  setFabricPollingInterval(state, payload) {
    return { ...state, fabricPollingInterval: payload };
  },
  setFabricPolling(state, payload) {
    return { ...state, isPollingFabric: payload };
  },
  setMetricsEndpoint(state, payload) {
    return { ...state, metricsEndpoint: payload };
  },
  setMetricsPollingFailures(state, payload) {
    return { ...state, metricsPollingFailures: payload };
  },
  setRuntime(state, payload) {
    return { ...state, runtime: payload };
  },
  setSelectedInstance(state, payload) {
    return { ...state, selectedInstance: payload };
  },
  setSelectedService(state, payload) {
    return { ...state, selectedService: payload };
  },
  setServicesPollingFailures(state, payload) {
    return { ...state, servicesPollingFailures: payload };
  },
  setThreadsEndpoints(state, payload) {
    return { ...state, threadsEndpoint: payload };
  },
  setThreadsFilter(state, payload) {
    return { ...state, threadsFilter: payload };
  }
});

export default settings;
