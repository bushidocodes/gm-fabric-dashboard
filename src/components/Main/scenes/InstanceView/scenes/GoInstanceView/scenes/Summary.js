import dateFormat from "dateformat";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import LayoutSection from "components/LayoutSection";
import ErrorBoundary from "components/ErrorBoundary";
import UpTime from "components/UpTime";
import GMLineChart from "components/Main/components/GMLineChart";
import ReadoutGroup from "components/Main/components/ReadoutGroup";
import Readout from "components/Main/components/Readout";
import { calculateErrorPercent, formatAsDecimalString } from "utils";
import { getDygraphOfValue, mapDygraphKeysToNetChange } from "utils/dygraphs";
import { getLatestAttribute } from "utils/latestAttribute";
import ArrayValue from "components/ArrayValue";
import { metricsShape } from "components/PropTypes";

/**
 * Static Summary page for GO runtime
 * @function SummaryGrid
 */
function SummaryGrid({
  metrics,
  selectedInstance,
  selectedService,
  selectedServiceVersion
}) {
  const allRequests = getLatestAttribute(metrics, "all/requests");
  const allErrors = getLatestAttribute(metrics, "all/errors.count");
  const startTime = getLatestAttribute(metrics, "system/start_time");
  const errorPercent = allRequests
    ? calculateErrorPercent(allRequests, allErrors)
    : formatAsDecimalString(0);

  const processMemoryUsed = getLatestAttribute(
    metrics,
    "process/memory/used",
    3,
    "B",
    "MB"
  );
  const hostMemoryAvail = getLatestAttribute(
    metrics,
    "system/memory/available",
    3,
    "B",
    "GB"
  );
  return (
    <ErrorBoundary>
      <LayoutSection title="Vitals" icon="EKG">
        <ReadoutGroup>
          <Readout
            readoutItems={[
              {
                detail: dateFormat(startTime),
                icon: "Summary",
                title: "Uptime",
                value: (
                  <UpTime
                    startTime={startTime}
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
                  getLatestAttribute(metrics, "all/latency_ms.avg")
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
                detail: `${getLatestAttribute(
                  metrics,
                  "system/cpu_cores"
                )} Cores on Host`,
                icon: "CPU",
                title: "Host CPU Utilized",
                value: `${getLatestAttribute(metrics, "system/cpu.pct", 3)}%`
              },
              {
                detail: `${hostMemoryAvail} GB Free on Host`,
                icon: "Memory",
                title: "Memory Utilized",
                value: `${processMemoryUsed} MB`
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
                ["HTTPS/requests", "HTTP/requests", "RPC/requests"],
                ["HTTPS", "HTTP", "RPC"]
              ),
              ["HTTPS", "HTTP", "RPC"]
            )}
            title="Requests Per Second"
          />
        </div>
      </LayoutSection>
    </ErrorBoundary>
  );
}

SummaryGrid.propTypes = {
  metrics: metricsShape,
  selectedInstance: PropTypes.string,
  selectedService: PropTypes.string,
  selectedServiceVersion: PropTypes.string
};

function mapStateToProps(state) {
  return {
    metrics: state.instance.metrics,
    selectedService: state.fabric.selectedService,
    selectedServiceVersion: state.fabric.selectedServiceVersion,
    selectedInstance: state.fabric.selectedInstance
  };
}

export default connect(mapStateToProps)(SummaryGrid);
