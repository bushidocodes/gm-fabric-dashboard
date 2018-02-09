import { createSelector } from "reselect";

import { getLatestAttribute } from "../latestAttribute";
import { getSparkLineOfNetChange } from "../sparklines";
import { getDygraphOfValue, mapDygraphKeysToNetChange } from "../dygraphs";
import { getMetrics, getRoutesTree, getRoutesMetrics } from "../selectors";
import { calculateErrorPercent, formatAsDecimalString } from "utils";
import PropTypes from "prop-types";

// JVM - Specific Redux state
const getCurrentThreads = state => state.threadsTable;
const getThreadsFilter = state => state.settings.threadsFilter;

/**
 * A selector that takes metrics and returns percent error without % symbol
 * toLocaleString() forces three decimal points and
 * returns language sensitive representation of number (commas and periods)
 */
export const getErrorPercent = createSelector(getMetrics, metrics => {
  if (Object.keys(metrics).length === 0) return formatAsDecimalString(0);
  const totalRequests =
    Number(getLatestAttribute(metrics, "http/requests") || 0) +
    Number(getLatestAttribute(metrics, "https/requests") || 0);
  const totalSuccesses =
    Number(getLatestAttribute(metrics, "http/success") || 0) +
    Number(getLatestAttribute(metrics, "https/success") || 0);
  if (totalRequests > 0) {
    return calculateErrorPercent(totalRequests, totalRequests - totalSuccesses);
  } else {
    return formatAsDecimalString(0);
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

        const latency50Key = `route${routePath}/${routeVerb}/time.p50`;
        const latency99Key = `route${routePath}/${routeVerb}/time.p99`;
        const requests = getLatestAttribute(routesMetrics, requestsKey);
        const totalSuccesses = getLatestAttribute(routesMetrics, successesKey);
        const latency50 = getLatestAttribute(routesMetrics, latency50Key);
        const latency99 = getLatestAttribute(routesMetrics, latency99Key);
        const errorPercent = calculateErrorPercent(
          requests,
          requests - totalSuccesses
        );
        routesTable.push({
          ...baseObj,
          errorPercent,
          requests,
          verb: routeVerb,
          latency50,
          latency99,
          requestsPerSecond_sparkline: getSparkLineOfNetChange(
            routesMetrics,
            requestsKey
          ),
          requestsPerSecond_dygraph: mapDygraphKeysToNetChange(
            getDygraphOfValue(routesMetrics, [requestsKey])
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

export const threadCountsShape = PropTypes.shape({
  active: PropTypes.number,
  idle: PropTypes.number,
  stopped: PropTypes.number,
  all: PropTypes.number
});

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
