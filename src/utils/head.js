/**
 * getBasename is a utility function that extracts the baseurl property from the HEAD of the index.html file. This is
 * the means by which a dashboard is configured to be served out on a deeply nested path.
 * @returns {String}
 */
export function getBasename() {
  if (process.env.NODE_ENV === "production") {
    return document.head.querySelector("[property=baseUrl]").content;
  } else {
    return "/gmadmin/";
  }
}

/**
 * getServicename is a utility function that extracts the service property from the HEAD of the index.html file. This is
 * the means by which a dashboard is configured to be served out on a deeply nested path.
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
 * generateEndpoints is a utility function that returns the endpoints that should be scraped for current runtime
 * This should ONLY be used to populate the initial Redux state
 * @returns {String[]}
 */
export function generateEndpoints() {
  switch (getRuntime()) {
    case "ENVOY":
      return [getBasename().replace("/gmadmin/", "/stats")];
    case "JVM":
      return [getBasename().replace("/gmadmin/", "/admin/metrics.json")];
    case "GOLANG":
      return [getBasename().replace("/gmadmin/", "/admin/metrics")];
    default:
      return [];
  }
}

/**
 * generateThreadEndpoints is a utility function that returns the endpoints that should be scraped for current runtime
 * This should ONLY be used to populate the initial Redux state
 * @returns {String}
 */
export function generateThreadsEndpoint() {
  switch (getRuntime()) {
    case "JVM":
      return getBasename().replace("/gmadmin/", "/admin/threads");
    case "GOLANG":
    default:
      return "";
  }
}
