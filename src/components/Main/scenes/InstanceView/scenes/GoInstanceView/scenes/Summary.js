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
import { injectIntl } from "react-intl";

/**
 * Static Summary page for GO runtime
 * @function SummaryGrid
 */
function SummaryGrid({
  metrics,
  selectedInstanceID,
  selectedServiceSlug,
  intl
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
      <LayoutSection
        title={intl.formatMessage({
          id: "summary.vitals",
          defaultMessage: "Vitals",
          description: "Vitals header text"
        })}
        icon="EKG"
      >
        <ReadoutGroup>
          <Readout
            readoutItems={[
              {
                detail: intl.formatTime(startTime, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric"
                }),
                icon: "Summary",
                title: intl.formatMessage({
                  id: "summary.uptime",
                  defaultMessage: "Uptime",
                  description: "Uptime detail text"
                }),
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
                title: intl.formatMessage({
                  id: "summary.responseTime",
                  defaultMessage: "Response Time",
                  description: "Response time title text"
                }),
                value: `${_.round(
                  getLatestAttribute(metrics, "all/latency_ms.avg")
                )}ms`
              },
              {
                icon: "Exclamation",
                iconBorderStyle: "BorderTriangleSmall",
                iconBorderWidth: 2,
                title: intl.formatMessage({
                  id: "summary.errorRate",
                  defaultMessage: "Error Rate",
                  description: "Error rate title text"
                }),
                value: `${errorPercent}%`
              }
            ]}
          />
          <Readout
            readoutItems={[
              {
                title: intl.formatMessage({
                  id: "summary.hostCPUUsage",
                  defaultMessage: "Host CPU Utilized",
                  description: "Host CPU Usage title text"
                }),
                detail: intl.formatMessage(
                  {
                    id: "summary.hostCPUUsageDetail",
                    defaultMessage:
                      "{count, plural, one {# Core on Host} other {#  Cores on Host}}",
                    description: "Host CPU Usage detail text"
                  },
                  {
                    count: getLatestAttribute(metrics, "system/cpu_cores")
                  }
                ),
                icon: "CPU",
                value: `${getLatestAttribute(metrics, "system/cpu.pct", 3)}%`
              },
              {
                icon: "Memory",
                title: intl.formatMessage({
                  id: "summary.memoryUsage",
                  defaultMessage: "Memory Utilized",
                  description: "Memory usage title text"
                }),
                detail: intl.formatMessage(
                  {
                    id: "summary.memoryUsageDetail",
                    defaultMessage: "{hostMemoryAvail} GB Free on Host",
                    description: "Memory usage detail text"
                  },
                  { hostMemoryAvail }
                ),
                value: `${processMemoryUsed} MB`
              }
            ]}
          />
        </ReadoutGroup>
      </LayoutSection>
      <LayoutSection
        title={intl.formatMessage({
          id: "summary.statistics",
          defaultMessage: "Statistics",
          description: "Statistics header text"
        })}
        icon="Scatterplot"
      >
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
            title={intl.formatMessage({
              id: "summary.requestsPerSecond",
              defaultMessage: "Requests Per Second",
              description: "Requests Per Second title text"
            })}
          />
        </div>
      </LayoutSection>
    </ErrorBoundary>
  );
}

SummaryGrid.propTypes = {
  intl: PropTypes.object.isRequired,
  metrics: metricsShape,
  selectedInstanceID: PropTypes.string,
  selectedServiceSlug: PropTypes.string
};

function mapStateToProps(state) {
  return {
    metrics: state.instance.metrics,
    selectedServiceSlug: state.fabric.selectedServiceSlug,
    selectedInstanceID: state.fabric.selectedInstanceID
  };
}

export default connect(mapStateToProps)(injectIntl(SummaryGrid));
