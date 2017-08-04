import { createSelector } from "reselect";
import _ from "lodash";

// Reselect Selectors

// Reselect Input Selectors

const getMetrics = state => state.metrics;

// Reselect Memoized Selectors

/**
 * A Reselect selector that filters the metrics and only returns the timeseries
 * that contain the string 'route' somewhere in the key.
 */
export const getRouteMetrics = createSelector(getMetrics, metrics => {
  return _.pick(
    metrics,
    Object.keys(metrics).filter(key => key.indexOf("route") !== -1)
  );
});

/**
 * A Reselect selector that generates a special hierarchical tree structure of route data
 * from the timeseries keys. It's used to render the special Route dashboards for the JVM
 */
export const getRouteTree = createSelector(getRouteMetrics, routeMetrics => {
  const keys = Object.keys(routeMetrics);
  // Short circuit if metrics hasn't yet been populated
  if (keys.length === 0) return {};
  const routeList = {};
  keys.forEach(route => {
    const routeRegex = /route(.*)\/(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH)\/(.*)/;
    const routePath = route.replace(routeRegex, "$1") || "/"; // Path with trailing slash or root
    const httpVerb = route.replace(routeRegex, "$2"); // Valid HTTP Verb
    // If an array of values already exists at the key, add the new value to the array
    const previousValue = _.get(routeList, [routePath, httpVerb], "notFound");
    if (previousValue !== "notFound") {
      _.set(routeList, [routePath, httpVerb], [...previousValue, route]);
      // Otherwise add the value as the sold value of an array at that key
    } else {
      _.set(routeList, [routePath, httpVerb], [route]);
    }
  });
  return routeList;
});
