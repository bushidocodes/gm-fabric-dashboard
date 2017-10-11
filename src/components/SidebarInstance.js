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

class SidebarInstance extends Component {
  static propTypes = {
    dashboards: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    metrics: PropTypes.object.isRequired,
    service: PropTypes.object
  };
  /**
   * Utility function for generating the appropriate nav elements for the static dashboards associated with the current
   * runtime environment
   * @param {string} serviceName 
   * @param {string} instanceID 
   * @param {string} runtime 
   * @param {Object} dashboards 
   * @param {Object} metrics 
   */
  generateDashboards(serviceName, instanceID, runtime, dashboards, metrics) {
    switch (runtime) {
      case "JVM":
        return (
          <div>
            <SidebarCard
              href={`/${serviceName}/${instanceID}/summary`}
              icon="star"
              lines={[
                {
                  name: "Uptime",
                  value: ms(getLatestAttribute(metrics, "jvm/uptime"))
                }
              ]}
              tabIndex={0}
              title="Summary"
            />
            <SidebarCard
              href={`/${serviceName}/${instanceID}/route`}
              icon="link"
              tabIndex={0}
              title="Routes"
            />
            <SidebarCard
              chartData={getSparkLineOfValue(metrics, "jvm/thread/count")}
              href={`/${serviceName}/${instanceID}/threads`}
              icon="table"
              lines={[
                {
                  name: "Threads",
                  value: getLatestAttribute(metrics, "jvm/thread/count")
                }
              ]}
              tabIndex={0}
              title="Threads"
            />
            {this.generateDynamicDashboards(
              serviceName,
              instanceID,
              dashboards,
              metrics
            )}
            <SidebarCard
              href={`/${serviceName}/${instanceID}/explorer`}
              icon="search"
              tabIndex={0}
              title="Explorer"
            />
          </div>
        );
      default:
        return (
          <div>
            {this.generateDynamicDashboards(
              serviceName,
              instanceID,
              dashboards,
              metrics
            )}
            <SidebarCard
              href={`/${serviceName}/${instanceID}/explorer`}
              icon="search"
              tabIndex={0}
              title="Explorer"
            />
          </div>
        );
    }
  }
  /**
   * Utility function for generating dynamic dashboards derived from JSON
   * @param {*} serviceName 
   * @param {*} instanceID 
   * @param {*} dashboards 
   * @param {*} metrics 
   */
  generateDynamicDashboards(serviceName, instanceID, dashboards, metrics) {
    return _.toPairs(dashboards).map(([key, value]) => {
      const hasValidChart = _.has(value, "summaryCard.chart.type");
      const lines = value.summaryCard.lines.map(line => ({
        name: line.name,
        value: parseJSONString(line.value, metrics)
      }));
      let chartData, chartTitle;
      if (hasValidChart && value.summaryCard.chart.type === "value") {
        chartTitle = value.summaryCard.chart.title;
        chartData = getSparkLineOfValue(
          metrics,
          value.summaryCard.chart.dataAttribute
        );
      } else if (
        hasValidChart &&
        value.summaryCard.chart.type === "netChange"
      ) {
        chartTitle = value.summaryCard.chart.title;
        chartData = getSparkLineOfNetChange(
          metrics,
          value.summaryCard.chart.dataAttribute
        );
      } else {
        chartTitle = undefined;
        chartData = undefined;
      }
      return (
        <SidebarCard
          chartData={chartData}
          chartTitle={chartTitle}
          href={`/${serviceName}/${instanceID}/${key}`}
          icon={value.summaryCard.icon}
          key={`/${serviceName}/${instanceID}/${key}`}
          lines={lines}
          tabIndex={0}
          title={value.name}
        />
      );
    });
  }

  render() {
    const {
      dashboards,
      match: { params: { instanceID } },
      metrics,
      service
    } = this.props;
    return (
      <div className="summary-bar">
        {service && (
          <SidebarNavWidget
            currentID={instanceID}
            parentName={service.name}
            parentPath={`/${service.name}`}
            siblings={service.instances}
          />
        )}
        {service &&
          this.generateDashboards(
            service.name,
            instanceID,
            service.runtime,
            dashboards,
            metrics
          )}
      </div>
    );
  }
}

function mapStateToProps(
  { dashboards, metrics, fabric: { services } },
  ownProps
) {
  return {
    dashboards,
    metrics,
    service: services[ownProps.match.params.serviceName]
  };
}

export default connect(mapStateToProps)(SidebarInstance);
