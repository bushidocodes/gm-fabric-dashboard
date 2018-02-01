import dateFormat from "dateformat";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import LayoutSection from "components/LayoutSection";
import GMLineChart from "components/Main/components/GMLineChart";
import Readout from "components/Main/components/Readout";
import ReadoutGroup from "components/Main/components/ReadoutGroup";
import ErrorBoundary from "components/ErrorBoundary";
import UpTime from "components/UpTime";
import { getDygraphOfValue, mapDygraphKeysToNetChange } from "utils/dygraphs";
import { getLatestAttribute } from "utils/latestAttribute";
import { getErrorPercent } from "utils/jvm/selectors";

import ArrayValue from "components/ArrayValue";
import { metricsShape } from "components/PropTypes";

/**
 * Static Summary page for JVM runtime
 * @function SummaryGrid
 */
function SummaryGrid({
  errorPercent,
  metrics,
  selectedInstanceID,
  selectedServiceSlug
}) {
  return (
    <ErrorBoundary>
      <LayoutSection title="Vitals" icon={"EKG"}>
        <ReadoutGroup>
          <Readout
            readoutItems={[
              {
                detail: dateFormat(
                  getLatestAttribute(metrics, "jvm/start_time")
                ),
                icon: "Summary",
                title: "Uptime",
                value: (
                  <UpTime
                    startTime={getLatestAttribute(metrics, "jvm/start_time")}
                    render={uptime => (
                      <ArrayValue>
                        {_.map(uptime, el => <span key={el}>{el} </span>)}
                      </ArrayValue>
                    )}
                  />
                )
              }
            ]}
          />

          <Readout
            primary={true}
            readoutItems={[
              {
                icon: "Timer",
                title: "Avg. Response Time",
                value: `${_.round(
                  getLatestAttribute(metrics, "time/2XX.avg")
                )}ms`
              },
              {
                icon: "Exclamation",
                iconBorderStyle: "BorderTriangleSmall",
                iconBorderWidth: 2,
                title: "Error Rate",
                value: `${errorPercent}%`
              }
            ]}
          />

          <Readout
            readoutItems={[
              {
                icon: "CPU",
                title: "Host CPU Cores",
                value: `${getLatestAttribute(metrics, "jvm/num_cpus")}`
              }
            ]}
          />
        </ReadoutGroup>
      </LayoutSection>

      <LayoutSection title="Statistics" icon="Scatterplot">
        <div style={{ height: "250px" }}>
          <GMLineChart
            timeSeries={mapDygraphKeysToNetChange(
              getDygraphOfValue(
                metrics,
                ["https/requests", "http/requests"],
                ["HTTPS", "HTTP"]
              ),
              ["HTTPS", "HTTP"]
            )}
            title="Requests Per Second"
          />
        </div>
      </LayoutSection>
    </ErrorBoundary>
  );
}

SummaryGrid.propTypes = {
  errorPercent: PropTypes.string,
  metrics: metricsShape,
  selectedInstanceID: PropTypes.string,
  selectedServiceSlug: PropTypes.string
};

function mapStateToProps(state) {
  return {
    metrics: state.instance.metrics,
    selectedServiceSlug: state.fabric.selectedServiceSlug,
    selectedInstanceID: state.fabric.selectedInstanceID,
    errorPercent: getErrorPercent(state)
  };
}

export default connect(mapStateToProps)(SummaryGrid);
