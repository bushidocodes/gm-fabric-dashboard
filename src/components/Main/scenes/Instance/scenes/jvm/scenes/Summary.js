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

/**
 * Static Summary page for JVM runtime
 * @function SummaryGrid
 */
function SummaryGrid({
  errorPercent,
  metrics,
  selectedInstance,
  selectedService,
  selectedServiceVersion
}) {
  return (
    <ErrorBoundary>
      <LayoutSection title={"Vitals"}>
        <ReadoutGroup>
          <Readout
            readoutItems={[
              {
                detail: dateFormat(
                  getLatestAttribute(metrics, "jvm/start_time")
                ),
                icon: "future",
                title: "Uptime",
                value: (
                  <UpTime
                    startTime={getLatestAttribute(metrics, "jvm/start_time")}
                    render={uptime => <div>{uptime}</div>}
                  />
                )
              }
            ]}
          />

          <Readout
            primary={true}
            readoutItems={[
              {
                icon: "bolt",
                title: "Avg. Response Time",
                value: `${_.round(
                  getLatestAttribute(metrics, "time/2XX.avg")
                )}ms`
              },
              {
                icon: "warning",
                title: "Error Rate",
                value: `${errorPercent}%`
              }
            ]}
          />

          <Readout
            readoutItems={[
              {
                icon: "server",
                title: "Host CPU Cores",
                value: `${getLatestAttribute(metrics, "jvm/num_cpus")}`
              }
            ]}
          />
        </ReadoutGroup>
      </LayoutSection>

      <LayoutSection title={"Statistics"}>
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
  metrics: PropTypes.object,
  selectedInstance: PropTypes.string,
  selectedService: PropTypes.string,
  selectedServiceVersion: PropTypes.string
};

function mapStateToProps(state) {
  return {
    metrics: state.instance.metrics,
    selectedService: state.fabric.selectedService,
    selectedServiceVersion: state.fabric.selectedServiceVersion,
    selectedInstance: state.fabric.selectedInstance,
    errorPercent: getErrorPercent(state)
  };
}

export default connect(mapStateToProps)(SummaryGrid);
