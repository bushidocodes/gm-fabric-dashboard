import React from "react";
import { createSelector } from "reselect";
import _ from "lodash";
import { parseJSONString } from "../utils/latestAttribute";
import {
  getSparkLineOfValue,
  getSparkLineOfNetChange
} from "../utils/sparklines";
import SidebarCard from "../components/SidebarCard";

// Reselect Input Selectors

export const getMetrics = state => state.metrics;
export const getRuntime = state => state.settings.runtime;
export const getDashboards = state => state.dashboards;

/**
 * Reselect selector that generates SidebarCard components from JSON
 */
export const generateSidebarCards = createSelector(
  [getDashboards, getMetrics],
  (dashboards, metrics) => {
    if (Object.keys(dashboards).length > 0) {
      return _.toPairs(dashboards).map(([key, value]) => {
        let chartData, chartTitle, lines;
        // Render lines of text if present
        if (_.has(value, "summaryCard.lines")) {
          lines = value.summaryCard.lines.map(line => ({
            name: line.name,
            value: parseJSONString(line.value, metrics)
          }));
        }
        // Render a chart if present
        if (_.has(value, "summaryCard.chart")) {
          chartTitle = value.summaryCard.chart.title;
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
          <SidebarCard
            chartData={chartData}
            chartTitle={chartTitle}
            href={`/${key}`}
            icon={value.summaryCard.icon}
            key={`/${key}`}
            lines={lines}
            tabIndex={9}
            title={value.name}
          />
        );
      });
    }
  }
);

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
