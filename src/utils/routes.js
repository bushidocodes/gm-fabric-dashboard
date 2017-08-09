import { createSelector } from "reselect";
import _ from "lodash";
import { getLatestAttribute } from "./latestAttribute";
import { getSparkLineOfNetChange } from "./sparklines";
import { getDygraphOfValue, mapDygraphKeysToNetChange } from "./dygraphs";

// Reselect Selectors

// Reselect Input Selectors

const getMetrics = state => state.metrics;

// Reselect Memoized Selectors

/**
 * A Reselect selector that filters the metrics and only returns the timeseries
 * that contain the string 'route' somewhere in the key.
 */
export const getRoutesMetrics = createSelector(getMetrics, metrics => {
  return _.pick(
    metrics,
    Object.keys(metrics).filter(key => key.indexOf("route") !== -1)
  );
});

/**
 * A Reselect selector that generates a special hierarchical tree structure of route data
 * from the timeseries keys. It's used to render the special Route dashboards for the JVM
 */
export const getRoutesTree = createSelector(getRoutesMetrics, routesMetrics =>
  _buildRoutesTree(routesMetrics)
);

function _buildRoutesTree(routeMetrics) {
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
}
/**
 * A reselect selector that builds the data required to render the RoutesTable component
 */
export const getRoutesTable = createSelector(
  getRoutesMetrics,
  routesMetrics => {
    const routesTree = _buildRoutesTree(routesMetrics);
    // Now build the table
    const routes = [];
    const routesPaths = Object.keys(routesTree);
    routesPaths.forEach(routePath => {
      let baseObj = { route: routePath };
      Object.keys(routesTree[routePath]).forEach(routeVerb => {
        const requestsKey =
          routePath === "/"
            ? `route/${routeVerb}/requests`
            : `route${routePath}/${routeVerb}/requests`;
        const successesKey =
          routePath === "/"
            ? `route/${routeVerb}/status/2XX`
            : `route${routePath}/${routeVerb}/status/2XX`;
        const totalRequests = getLatestAttribute(routesMetrics, requestsKey);
        const totalSuccesses = getLatestAttribute(routesMetrics, successesKey);
        const errorRate = _.round(
          (totalRequests - totalSuccesses) / totalRequests * 100,
          4
        ).toFixed(4);
        let localObj = Object.assign(
          {},
          baseObj,
          { verb: routeVerb },
          {
            totalRequests,
            requestsPerSecond_sparkline: getSparkLineOfNetChange(
              routesMetrics,
              requestsKey
            ),
            requestsPerSecond_dygraph: mapDygraphKeysToNetChange(
              getDygraphOfValue(
                routesMetrics,
                [requestsKey],
                ["Requests Per Second"]
              ),
              ["Requests Per Second"]
            ),
            errorRate
          }
        );
        routes.push(localObj);
      });
    });
    return routes;
  }
);
