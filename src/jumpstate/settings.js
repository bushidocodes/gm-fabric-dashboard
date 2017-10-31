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
    /**
     * Used ONLY when running with a "Fabric Server" discovery service
     */

    fabricServer: getFabricServer(),
    selectedInstance: null,
    selectedServiceVersion: null,
    selectedService: null,
    isPollingFabric: false,
    fabricPollingInterval: 5000,
    servicesPollingFailures: 0,

    /**
     * Used ONLY when running without a "Fabric Server discovery service"
     */

    /**
     * These attributes contain static settings that the dashboard uses to directly
     * poll an inidividual microservice when running without a "Fabric Server"
     * discovery service. They are populated when the app initializes from
     * meta tags in the index.html. When the dashboard is used with a "fabric server"
     * (discovery service), this value is always null, as the disovery service
     * provides service metadata and proxies thread/metrics data from individual
     * microservices via its API.
    */
    threadsEndpoint: !getFabricServer() ? getThreadsEndpoint() : null,
    metricsEndpoint: !getFabricServer() ? getMetricsEndpoint() : null,
    runtime: !getFabricServer() ? getRuntime() : null,

    /**
     * Used when running either with or without a fabric server
     */
    isPollingInstance: false,
    instancePollingInterval: 5000,
    metricsPollingFailures: 0,
    threadsFilter: "all"
  },
  // Note: Some of these actions are never actually invoked, as the initial state
  // evaluates at app initialization and then never changes
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
  setSelectedServiceVersion(state, payload) {
    return { ...state, selectedServiceVersion: payload };
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
