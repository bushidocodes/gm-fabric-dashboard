// Utils for running with a Fabric Server

/**
 * getFabricServer is a utility function that extracts the fabricServer property
 * from the HEAD of the index.html file.
 * @returns {String}
 */
export function getFabricServer() {
  const fabricServer = document.head.querySelector("[property=fabricServer]")
    .content;
  return fabricServer !== "__FABRIC_SERVER__" ? fabricServer : null;
}

// Utils for running without a Fabric Server

/**
 * getServiceName is a utility function that extracts the serviceName property
 * from the HEAD of the index.html file.
 * @returns {String}
 */
export function getServiceName() {
  // Explicitly return null if running with Fabric Server
  if (getFabricServer()) return null;
  const serviceName = document.head.querySelector("[property=serviceName]")
    .content;
  if (serviceName === "__SERVICE_NAME__") {
    return "Service";
  } else {
    return serviceName;
  }
}

/**
 * getBackButtonUrl is a utility function that extracts the back button's target
 * URL from the HEAD of the index.html file.
 * @returns {String}
 */
export function getBackButtonUrl() {
  // Explicitly return null if running with Fabric Server
  if (getFabricServer()) return null;
  const backButtonUrl = document.head.querySelector("[property=backButtonUrl]")
    .content;
  if (backButtonUrl === "__BACK_BUTTON_URL__") {
    return "http://www.deciphernow.com/";
  } else {
    return backButtonUrl;
  }
}

/**
 * getRuntime is a utility function that extracts the runtime from the HEAD of the index.html file. It's used to determine
 * how the app should scrape metrics and render React components
 * @returns {String}
 */
export function getRuntime() {
  // Explicitly return null if running with Fabric Server
  if (getFabricServer()) return null;
  const metaRuntime = document.head.querySelector("[property=runtime]").content;
  const runtime =
    metaRuntime.indexOf("__RUNTIME") !== -1 ? "JVM" : `${metaRuntime}`; //default to JVM
  return runtime;
}

/**
 * getMetricsEndpoint is a utility function that returns the initial metrics endpoints
 * that should be scraped for current runtime. This should ONLY be used to populate the
 * initial Redux state
 * @returns {String}
 */
export function getMetricsEndpoint() {
  // Explicitly return null if running with Fabric Server
  if (getFabricServer()) return null;
  const metricsEndpoint = document.head.querySelector(
    "[property=metricsEndpoint]"
  ).content;
  // Default endpoints when in dev mode. Assume JVM by default
  if (process.env.NODE_ENV === `development`) {
    const runtime = getRuntime();
    switch (runtime) {
      case "GO":
        return "metrics";
      case "JVM":
      default:
        return "admin/metrics.json";
    }
    // Otherwise use the actual configuration
  } else if (metricsEndpoint !== "__METRICS_ENDPOINT__") {
    return metricsEndpoint;
  } else {
    return "";
  }
}

/**
 * generateThreadEndpoint is a utility function that returns the endpoint that should be scraped for the current runtime
 * This should ONLY be used to populate the initial Redux state
 * @returns {String}
 */
export function getThreadsEndpoint() {
  // Explicitly return null if running with Fabric Server
  if (getFabricServer()) return null;
  const threadsEndpoint = document.head.querySelector(
    "[property=threadsEndpoint]"
  ).content;
  const runtime = getRuntime();
  if (process.env.NODE_ENV === `development` && runtime === "JVM") {
    return "admin/threads";
  } else if (process.env.NODE_ENV === `production` && runtime === "JVM") {
    return threadsEndpoint;
  } else {
    return "";
  }
}
