import _ from "lodash";
import ms from "ms";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { getLatestAttribute, parseJSONString } from "../utils/latestAttribute";
import {
  getSparkLineOfValue,
  getSparkLineOfNetChange
} from "../utils/sparklines";
import SidebarCard from "./SidebarCard";
import SidebarNavWidget from "./SidebarNavWidget";

class Sidebar extends Component {
  static propTypes = {
    dashboards: PropTypes.object.isRequired,
    metrics: PropTypes.object.isRequired,
    runtime: PropTypes.string
  };

  /** Returns the appropriate nav elements for the current runtime environment */
  renderDashboards() {
    const { runtime, metrics } = this.props;
    switch (runtime) {
      case "JVM":
        return (
          <div>
            <SidebarCard
              href={`/summary`}
              icon="star"
              lines={[
                {
                  name: "Uptime",
                  value: ms(getLatestAttribute(metrics, "jvm/uptime"))
                }
              ]}
              tabIndex={1}
              title="Summary"
            />
            <SidebarCard
              href={`/route`}
              icon="link"
              tabIndex={3}
              title="Routes"
            />
            <SidebarCard
              chartData={getSparkLineOfValue(metrics, "jvm/thread/count")}
              href={`/threads`}
              icon="table"
              lines={[
                {
                  name: "Threads",
                  value: getLatestAttribute(metrics, "jvm/thread/count")
                }
              ]}
              tabIndex={4}
              title="Threads"
            />
            {this.generateDynamicDashboards()}
            <SidebarCard
              href={`/explorer`}
              icon="search"
              tabIndex={8}
              title="Explorer"
            />
          </div>
        );
      case "GOLANG":
        return (
          <div>
            <SidebarCard
              href={`/summary`}
              icon="star"
              tabIndex={1}
              title="Summary"
            />
            {this.generateDynamicDashboards()}
            <SidebarCard
              href={`/explorer`}
              icon="search"
              tabIndex={8}
              title="Explorer"
            />
          </div>
        );
      default:
        return (
          <div>
            {this.generateDynamicDashboards()}
            <SidebarCard
              href={`/explorer`}
              icon="search"
              tabIndex={8}
              title="Explorer"
            />
          </div>
        );
    }
  }

  /** Utility function for generating dynamic dashboards derived from JSON */
  generateDynamicDashboards() {
    const { dashboards, metrics } = this.props;
    if (Object.keys(dashboards).length > 0) {
      return _.toPairs(dashboards).map(([key, value]) => {
        let chartData, chartTitle, lines;
        // Render lines of text if present
        if (_.has(value, "summaryCard.chart.lines")) {
          lines = value.summaryCard.lines.map(line => ({
            name: line.name,
            value: parseJSONString(line.value, metrics)
          }));
        }
        // Render a chart if present
        if (_.has(value, "summaryCard.chart.type")) {
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

  render() {
    return (
      <div className="summary-bar">
        <SidebarNavWidget />
        {this.renderDashboards()}
      </div>
    );
  }
}

function mapStateToProps({ dashboards, metrics, settings: { runtime } }) {
  return {
    dashboards,
    metrics,
    runtime
  };
}

export default connect(mapStateToProps)(Sidebar);
