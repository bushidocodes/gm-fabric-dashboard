import { State } from "jumpstate";

import {
  getRuntime,
  getMetricsEndpoint,
  getThreadsEndpoint
} from "../utils/head";

const settings = State({
  initial: {
    isPolling: true,
    pollingHasInitialized: false,
    interval: 5000,
    metricsEndpoints: getMetricsEndpoint(),
    threadsEndpoint: getThreadsEndpoint(),
    pollingFailures: 0,
    runtime: getRuntime(),
    threadsFilter: "all"
  },
  setPollingAsInitialized(state, payload) {
    return { ...state, pollingHasInitialized: true };
  },
  togglePolling(state, payload) {
    return { ...state, isPolling: !state.isPolling };
  },
  setInterval(state, payload) {
    return { ...state, interval: payload };
  },
  setMetricsEndpoints(state, payload) {
    return { ...state, metricsEndpoints: payload };
  },
  setThreadsEndpoints(state, payload) {
    return { ...state, threadsEndpoint: payload };
  },
  setRuntime(state, payload) {
    return { ...state, runtime: payload };
  },
  setThreadsFilter(state, payload) {
    return { ...state, threadsFilter: payload };
  },
  incrementPollingFailures(state, payload) {
    const pollingFailures = state.pollingFailures + 1;
    return { ...state, pollingFailures };
  },
  resetPollingFailures(state, payload) {
    return { ...state, pollingFailures: 0 };
  }
});

export default settings;
