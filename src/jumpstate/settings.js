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
    isPolling: false,
    interval: 5000,
    fabricServer: getFabricServer(),
    metricsEndpoint: !getFabricServer() ? getMetricsEndpoint() : null,
    threadsEndpoint: !getFabricServer() ? getThreadsEndpoint() : null,
    selectedInstance: null,
    selectedService: null,
    metricsPollingFailures: 0,
    runtime: !getFabricServer() ? getRuntime() : null,
    threadsFilter: "all"
  },
  setPolling(state, payload) {
    return { ...state, isPolling: payload };
  },
  setInterval(state, payload) {
    return { ...state, interval: payload };
  },
  setFabricServer(state, payload) {
    return { ...state, fabricServer: payload };
  },
  setMetricsEndpoint(state, payload) {
    return { ...state, metricsEndpoint: payload };
  },
  setThreadsEndpoints(state, payload) {
    return { ...state, threadsEndpoint: payload };
  },
  setSelectedInstance(state, payload) {
    return { ...state, selectedInstance: payload };
  },
  setSelectedService(state, payload) {
    return { ...state, selectedService: payload };
  },
  setRuntime(state, payload) {
    return { ...state, runtime: payload };
  },
  setThreadsFilter(state, payload) {
    return { ...state, threadsFilter: payload };
  },
  setMetricsPollingFailures(state, payload) {
    return { ...state, metricsPollingFailures: payload };
  }
});

export default settings;
