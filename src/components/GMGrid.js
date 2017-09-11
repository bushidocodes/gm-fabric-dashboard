// import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";

import GMBasicMetrics from "./GMBasicMetrics";
import GMLineChart from "./GMLineChart";
import GMTable from "./GMTable";
import {
  getDygraphOfValue,
  mapDygraphKeysToNetChange
} from "../utils/dygraphs";
import {
  getSparkLineOfValue,
  getSparkLineOfNetChange
} from "../utils/sparklines";

import { getLatestAttribute, parseJSONString } from "../utils/latestAttribute";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * Retrieves the dynamic JSON-based state from Redux for the dashboard matching the
 * React Router URL parameter and renders the appropriate UI components.
 */
class GMGrid extends Component {
  static propTypes = {
    dashboard: PropTypes.object,
    match: PropTypes.object.isRequired,
    metrics: PropTypes.object.isRequired,
    name: PropTypes.string
  };

  /**
   * Mapper function that takes a chart object and renders the appropriate component with the appropriate state
   * @param {Object} chart 
   * @param {string} chart.type - String representing the chart type (GMLineChart, GMTable, GMBasicMetrics)
   * @param {Object} chart.data
   * @param {Object[][]} chart.data.detailLines - Array of array of objects. The elements of the top level array are in the format expected by the parseJSONString utility function
   * @param {Object[]} chart.data.timeseries - Array of complex timeseries objects. Has a "type" attribute with a string signifying the type of timeseries (e.g. netChange)
   */
  renderChart(chart) {
    const { metrics } = this.props;
    switch (chart.type) {
      case "GMLineChart":
        return (
          <GMLineChart
            detailLines={
              chart.data.detailLines &&
              chart.data.detailLines.map(line => parseJSONString(line, metrics))
            }
            expectedAttributes={chart.data.timeseries.map(ts => ts.attribute)}
            height="max"
            timeSeries={mapDygraphKeysToNetChange(
              getDygraphOfValue(
                metrics,
                chart.data.timeseries.map(ts => ts.attribute),
                chart.data.timeseries.map(ts => ts.label)
              ),
              chart.data.timeseries
                .filter(ts => ts.type === "netChange")
                .map(ts => ts.label)
            )}
            title={chart.title}
          />
        );
      case "GMTable":
        return (
          <GMTable
            headers={chart.data.headers}
            rows={chart.data.rows.map((row, outerIdx) => {
              return row.map((cell, innerIdx) => {
                return innerIdx > 0 ? getLatestAttribute(metrics, cell) : cell;
              });
            })}
            title={chart.title}
          />
        );
      case "GMBasicMetrics":
        return (
          <GMBasicMetrics
            detailLines={chart.data.detailLines.map(
              (
                [
                  heading,
                  key,
                  priority,
                  sparklineKey = null,
                  sparklineType = null
                ]
              ) => {
                const results = [
                  heading,
                  getLatestAttribute(metrics, key),
                  priority
                ];
                if (sparklineKey && sparklineType) {
                  if (sparklineType === "value") {
                    results.push(
                      getSparkLineOfValue(this.props.metrics, sparklineKey)
                    );
                  } else if (sparklineType === "netChange") {
                    results.push(
                      getSparkLineOfNetChange(this.props.metrics, sparklineKey)
                    );
                  }
                }
                return results;
              }
            )}
            title={chart.title}
          />
        );
      default:
        return "";
    }
  }

  /**
   * Event handler for updating the layout of charts on the GMGrid. It is triggered by drag-and-drop actions on the charts
   * Note that this also seems to always be called on inital render
   * @param {Object} allLayouts 
   */
  updateDashboardLayout(allLayouts) {
    return;
    // Disabled for initial release
    // const updatedDashboard = Object.assign({}, this.props.dashboard, {
    //   grid: {
    //     layouts: allLayouts
    //   }
    // });
    // Namespace the dashboard properly and dispatch Jumpstate Effect to update Redux
    // We need to cast to lowercase to avoid duplicate entries
    // Actions.setDashboard({
    //   [this.props.dashboard.name.toLowerCase()]: updatedDashboard
    // });
  }

  /**
   * Renders a dashboard as a responsive grid
   * @param {Object} dashboard 
   */
  renderDashboard(dashboard) {
    // While this parent div looks superfluous, it is needed to ensure the proper vertical heigh of the dashboard
    return (
      <div>
        <ResponsiveReactGridLayout
          breakpoints={dashboard.grid.breakpoints}
          cols={dashboard.grid.cols}
          isDraggable={false}
          isResizable={false}
          layouts={dashboard.grid.layouts}
          onLayoutChange={(currentLayout, allLayouts) =>
            this.updateDashboardLayout(allLayouts)}
          rowHeight={dashboard.grid.rowHeight}
        >
          {dashboard.charts.map(chart => (
            <div
              data-grid={chart.position}
              key={chart.title}
              style={{
                overflow: "hidden"
              }}
            >
              {this.renderChart(chart)}
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }

  render() {
    const { dashboard } = this.props;
    if (!dashboard) {
      return <div>{`Dashboard does not exist`}</div>;
    } else {
      return this.renderDashboard(dashboard);
    }
  }
}

function mapStateToProps({ dashboards, metrics }, ownProps) {
  return {
    metrics,
    dashboard: dashboards[ownProps.match.params.dashboardName]
  };
}

export default connect(mapStateToProps)(GMGrid);
