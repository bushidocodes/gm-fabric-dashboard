import _ from "lodash";
import React from "react";
import { createSelector } from "reselect";

import { parseJSONString } from "./latestAttribute";
import { getSparkLineOfValue, getSparkLineOfNetChange } from "./sparklines";
import { encodeParameter } from "utils";
import { microserviceStatuses } from "utils/constants";

// TODO: Revisit architecture here
// This import makes me feel like generateHeaderTabs should not be a selector
import Tab from "components/AppHeader/components/Tab";

// Reselect Input Selectors

export const getMetrics = state => state.instance.metrics;
export const getStaticRuntime = state => state.settings.runtime;
export const getDashboards = state => state.dashboards;
export const getServices = state => state.fabric.services;

export const getFabricServer = state => state.settings.fabricServer;
export const getSelectedInstance = state => state.fabric.selectedInstance;
export const getSelectedServiceName = state => state.fabric.selectedService;
export const getSelectedServiceVersion = state =>
  state.fabric.selectedServiceVersion;

/**
 * Reselect selector that generates the key used in the Redux store for services
 * composed of a service name and a service version delimited by `|`
 */
export const getSelectedServiceKey = createSelector(
  [getSelectedServiceName, getSelectedServiceVersion],
  (selectedService, selectedServiceVersion) =>
    `${selectedService}|${selectedServiceVersion}`
);

/**
 * Reselect selector that returns the current selected service from the Redux store
 * if it is found and null if not found
 */
export const getSelectedService = createSelector(
  [getSelectedServiceKey, getServices],
  (key, services) => {
    if (Object.keys(services).indexOf(key) !== -1) {
      return services[key];
    } else {
      return null;
    }
  }
);

/**
 * Reselect selector that returns the current runtime
 * When running with a Fabric Server, this is either the runtime attribute of
 * the currently selected service or null
 * When running without a Fabric Server, this is the staticRuntime value
 */
export const getRuntime = createSelector(
  [getFabricServer, getSelectedService, getStaticRuntime],
  (fabricServer, service, staticRuntime) => {
    if (fabricServer) {
      return service ? service.runtime : null;
    } else {
      return staticRuntime;
    }
  }
);
/**
 * Reselect selector that generates Tab components from JSON
 */
export const generateHeaderTabs = createSelector(
  [
    getDashboards,
    getMetrics,
    getSelectedServiceName,
    getSelectedServiceVersion,
    getSelectedInstance
  ],
  (dashboards, metrics, service, version, instance) => {
    if (Object.keys(dashboards).length > 0) {
      const prefix =
        service && version && instance
          ? `/${encodeParameter(service)}/${version}/${instance}`
          : "";
      return _.toPairs(dashboards).map(([key, value]) => {
        let chartData, lines;
        // Render lines of text if present
        if (_.has(value, "summaryCard.lines")) {
          lines = value.summaryCard.lines.map(line => ({
            name: line.name,
            value: parseJSONString(line.value, metrics)
          }));
        }
        // Render a chart if present
        if (_.has(value, "summaryCard.chart")) {
          if (value.summaryCard.chart.type === "value") {
            chartData = getSparkLineOfValue(
              metrics,
              value.summaryCard.chart.dataAttribute
            );
          } else if (value.summaryCard.chart.type === "netChange") {
            chartData = getSparkLineOfNetChange(
              metrics,
              value.summaryCard.chart.dataAttribute
            );
          }
        }
        return (
          <Tab
            chartData={chartData}
            href={`${prefix}/${key}`}
            icon={value.summaryCard.icon}
            key={`/${key}`}
            lines={lines}
            title={value.name}
          />
        );
      });
    }
  }
);

/**
 * A Reselect selector factory
 * Returns a selector that returns all metrics with a key that includes
 * the string keyQuery. By default, the string is assumed to strictly match
 * the first characters of the key. However, the search can be forced to match
 * loosely. Note that this is more fagile because monitored microservices might
 * use the string you're querying in a way that you're not expecting!
 * @export
 * @param {string} keyQuery
 * @param {boolean} [isPrefix=true]
 * @returns function
 */
export function metricsKeySelectorGenerator(keyQuery, isPrefix = true) {
  const filterFunc = isPrefix
    ? key => key.substr(0, keyQuery.length) === keyQuery
    : key => key.indexOf(keyQuery) !== -1;
  return createSelector([getMetrics], metrics =>
    _.pick(metrics, Object.keys(metrics).filter(filterFunc))
  );
}

/**
 * A Reselect selector that filters the metrics and only returns the timeseries
 * that starts with the string 'route'.
 */
export const getRoutesMetrics = metricsKeySelectorGenerator("route");

/**
 * A Reselect selector that generates a special hierarchical tree structure of route data
 * from the timeseries keys. It's used to render the special Route dashboards for the JVM
 */
export const getRoutesTree = createSelector(getRoutesMetrics, routesMetrics =>
  _buildRoutesTree(routesMetrics)
);

function _buildRoutesTree(routeMetrics) {
  const keys = Object.keys(routeMetrics);
  if (keys.length > 0) {
    return keys.reduce((acc, key) => {
      const matchSet = key.match(
        /route(.*)\/(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH)\/.*/
      );
      // Array.prototype.match returns null if RegExp didn't match
      if (matchSet) {
        let [, path, verb] = matchSet;
        // Finagle represents a GET on the root routes as "/route/GET"
        if (path === "") {
          path = "/";
        }
        if (!acc[path]) {
          acc[path] = [verb];
        } else if (acc[path].indexOf(verb) === -1) {
          acc[path] = [...acc[path], verb];
        }
      }
      return acc;
    }, {});
  } else {
    return {};
  }
}

/**
 * getStatusCount is a utility function that takes an array of service objects and
 * returns an object with a count for each status.
 * if status is not one of predefined microservice statuses (Down, Warning or Stable),
 * status is counted as Down
 * @param {Object[]}
 * @returns {Object}
 */
export const getStatusCount = createSelector(getServices, services => {
  let statusCount = _.countBy(
    _.values(services).map(service => {
      let status = computeStatus(
        service.instances.length,
        service.minimum,
        service.maximum
      );
      return _.includes(microserviceStatuses, status) ? status : "Down";
    })
  );
  return _.assign(statusCount, { total: _.values(services).length });
});

/**
 * Computes and returns string representation of status for a service
 * @param {number} count  - service.instances.length (number of instances)
 * @param {number} min - service.minimum
 * @param {number} max - service.maximum
 * @returns {string} - "Down" || "Stable" || "Warning"
 */
export function computeStatus(count, min, max) {
  if (count === 0) {
    return "Down";
  } else if (count >= min && count <= max) {
    return "Stable";
  } else {
    return "Warning";
  }
}
