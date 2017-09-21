import { createSelector } from "reselect";
import _ from "lodash";
import { getLatestAttribute } from "../latestAttribute";
import { getSparkLineOfNetChange } from "../sparklines";
import { getDygraphOfValue, mapDygraphKeysToNetChange } from "../dygraphs";

import { getMetrics, getRoutesTree, getRoutesMetrics } from "../selectors";

// JVM - Specific Redux state
const getCurrentThreads = state => state.threadsTable;
const getThreadsFilter = state => state.settings.threadsFilter;

export const getErrorRate = createSelector(getMetrics, metrics => {
  if (Object.keys(metrics).length === 0) return Number(0).toFixed(4);
  const totalRequests =
    Number(getLatestAttribute(metrics, "http/requests") || 0) +
    Number(getLatestAttribute(metrics, "https/requests") || 0);
  const totalSuccesses =
    Number(getLatestAttribute(metrics, "http/success") || 0) +
    Number(getLatestAttribute(metrics, "https/success") || 0);
  if (totalRequests > 0) {
    return _.round(
      (totalRequests - totalSuccesses) / totalRequests * 100,
      4
    ).toFixed(4);
  } else {
    return Number(0).toFixed(4);
  }
});

/**
 * A reselect selector that builds the data required to render the RoutesTable component
 */
export const getRoutesTable = createSelector(
  [getRoutesTree, getRoutesMetrics],
  (routesTree, routesMetrics) => {
    // Now build the table
    const routesTable = [];
    const routesPaths = Object.keys(routesTree);
    routesPaths.forEach(routePath => {
      let baseObj = { route: routePath };
      routesTree[routePath].forEach(routeVerb => {
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
        routesTable.push({
          ...baseObj,
          errorRate,
          totalRequests,
          verb: routeVerb,
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
          )
        });
      });
    });
    return routesTable;
  }
);

/**
 * Filter the current threads according to store.settings.threadsFilter in the
 * Redux store.
 */
export const getVisibleThreads = createSelector(
  [getCurrentThreads, getThreadsFilter],
  (threadsTable, threadsFilter) => {
    switch (threadsFilter) {
      case "active":
        return threadsTable.filter(
          threadItem => threadItem.state === "RUNNABLE"
        );
      case "idle":
        return threadsTable.filter(
          threadItem =>
            threadItem.state === "WAITING" ||
            threadItem.state === "TIMED_WAITING"
        );
      case "stopped":
        return threadsTable.filter(
          threadItem =>
            threadItem.state === "TERMINATED" ||
            threadItem.state === "BLOCKED" ||
            threadItem.state === "NEW"
        );
      case "all":
      default:
        return threadsTable;
    }
  }
);

/**
 * Count the current threads according to the state and provide an object containing
 * these totals.
 */
export const getThreadCounts = createSelector(
  getCurrentThreads,
  (threadsTable = []) => {
    return {
      active: threadsTable
        ? threadsTable.filter(threadItem => threadItem.state === "RUNNABLE")
            .length
        : 0,
      idle: threadsTable
        ? threadsTable.filter(
            threadItem =>
              threadItem.state === "WAITING" ||
              threadItem.state === "TIMED_WAITING"
          ).length
        : 0,
      stopped: threadsTable
        ? threadsTable.filter(
            threadItem =>
              threadItem.state === "TERMINATED" ||
              threadItem.state === "BLOCKED" ||
              threadItem.state === "NEW"
          ).length
        : 0,
      all: threadsTable.length
    };
  }
);
