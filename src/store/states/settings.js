import { State } from "jumpstate";

import {
  getFabricServer,
  getRuntime,
  getMetricsEndpoint,
  getThreadsEndpoint
} from "utils/head";

// Initial state is determined by whether a fabric server has been configured or
// not. If the server has been configured, then metricsEndpoint, threadsEndpoint,
// and runtime are set to null and will be later set by the response from the
// fabric server. If the server has not been configured, the values are assumed
// to be statically configured in the index.html head and populated immediately.
const settings = State({
  initial: {
    fabricServer: getFabricServer(),
    metricsEndpoint: !getFabricServer() ? getMetricsEndpoint() : null,
    runtime: !getFabricServer() ? getRuntime() : null,
    threadsEndpoint: !getFabricServer() ? getThreadsEndpoint() : null,
    threadsFilter: "all"
  },
  // Note: Some of these actions are never actually invoked, as the initial state
  // evaluates at app initialization and then never changes

  setMetricsEndpoint(state, payload) {
    return { ...state, metricsEndpoint: payload };
  },
  setRuntime(state, payload) {
    return { ...state, runtime: payload };
  },
  setThreadsEndpoints(state, payload) {
    return { ...state, threadsEndpoint: payload };
  },
  setThreadsFilter(state, payload) {
    return { ...state, threadsFilter: payload };
  }
});

export default settings;
