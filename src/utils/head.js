/**
 * getServicename is a utility function that extracts the service property from the HEAD of the index.html file. 
 * @returns {String}
 */
export function getServicename() {
  const serviceName = document.head.querySelector("[property=service]").content;
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
  const metaRuntime = document.head.querySelector("[property=runtime]").content;
  const runtime =
    metaRuntime.indexOf("__BASE_RUNTIME") !== -1 ? "JVM" : `${metaRuntime}`; //default to JVM
  return runtime;
}

/**
 * getMetricsEndpoint is a utility function that returns the initial metrics endpoints
 * that should be scraped for current runtime. This should ONLY be used to populate the
 * initial Redux state
 * @returns {String}
 */
export function getMetricsEndpoint() {
  const metricsEndpoint = document.head.querySelector(
    "[property=metricsEndpoint]"
  ).content;
  // Default endpoints when in dev mode. Assume JVM by default
  if (process.env.NODE_ENV === `development`) {
    const runtime = getRuntime();
    switch (runtime) {
      case "GOLANG":
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
