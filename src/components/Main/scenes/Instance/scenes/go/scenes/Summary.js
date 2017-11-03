import dateFormat from "dateformat";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import GMLineChart from "../../../../../components/GMLineChart";
import LayoutSection from "../../../../../../LayoutSection";
import Readout from "../../../../../components/Readout";

import ReadoutGroup from "../../../../../components/ReadoutGroup";
import ErrorBoundary from "components/library/ErrorBoundary";
import UpTime from "components/library/UpTime";

import { getDygraphOfValue, mapDygraphKeysToNetChange } from "utils/dygraphs";
import { getLatestAttribute } from "utils/latestAttribute";
import { calculateErrorPercent, formatAsDecimalString } from "utils";

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
      <LayoutSection title={"Vitals"}>
        <ReadoutGroup>
          <Readout
            readoutItems={[
              {
                detail: dateFormat(startTime),
                icon: "future",
                title: "Uptime",
                value: (
                  <UpTime
                    startTime={startTime}
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
                  getLatestAttribute(metrics, "all/latency_ms.avg")
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
                detail: `${getLatestAttribute(
                  metrics,
                  "system/cpu_cores"
                )} Cores on Host`,
                icon: "server",
                title: "Host CPU Utilized",
                value: `${getLatestAttribute(metrics, "system/cpu.pct", 3)}%`
              },
              {
                detail: `${hostMemoryAvail} GB Free on Host`,
                icon: "server",
                title: "Memory Utilized",
                value: `${processMemoryUsed} MB`
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
  metrics: PropTypes.object,
  selectedInstance: PropTypes.string,
  selectedService: PropTypes.string,
  selectedServiceVersion: PropTypes.string
};

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
    selectedService: state.settings.selectedService,
    selectedServiceVersion: state.settings.selectedServiceVersion,
    selectedInstance: state.settings.selectedInstance
  };
}

export default connect(mapStateToProps)(SummaryGrid);
