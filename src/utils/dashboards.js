import React from "react";
import { createSelector } from "reselect";
import _ from "lodash";
import { parseJSONString } from "utils/latestAttribute";
import { getSparkLineOfValue, getSparkLineOfNetChange } from "utils/sparklines";
import SidebarCard from "../components/SidebarCard";

const getDashboards = state => state.dashboards;
const getMetrics = state => state.metrics;

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
            tabIndex={1}
            title={value.name}
          />
        );
      });
    }
  }
);
