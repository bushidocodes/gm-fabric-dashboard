import dateFormat from "dateformat";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import GMLineChart from "../../../../../components/GMLineChart";
import LayoutSection from "../../../../../../LayoutSection";
import Readout from "../../../../../components/Readout";
import ReadoutGroup from "../../../../../components/ReadoutGroup";
import ErrorBoundary from "components/library/ErrorBoundary";

import { getDygraphOfValue, mapDygraphKeysToNetChange } from "utils/dygraphs";
import { getLatestAttribute } from "utils/latestAttribute";
import { convertMS, calculateErrorPercent, formatAsDecimalString } from "utils";

/**
 * Static Summary page for Go runtime
 * @class SummaryGrid
 * @extends {Component}
 */
class SummaryGrid extends Component {
  static propTypes = {
    metrics: PropTypes.object,
    selectedInstance: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string
  };

  state = {
    _timer: null,
    startTime: getLatestAttribute(this.props.metrics, "system/start_time"),
    uptime: 0
  };

  // start timer in componentDidMount
  // in setInterval, call setState which triggers re-render
  componentDidMount() {
    this._timer = setInterval(() => this.onChangeUptime(), 1000);
  }

  // handles edge case when start_time changes
  componentWillReceiveProps(nextProps) {
    const changedStartTime = getLatestAttribute(
      nextProps.metrics,
      "system/start_time"
    );
    if (changedStartTime !== this.state.startTime) {
      this.setState({ startTime: changedStartTime });
    }
  }

  // call clearInterval() to cancel the timer
  componentWillUnmount() {
    clearInterval(this._timer);
  }

  onChangeUptime() {
    const uptime =
      this.state.startTime > 0 ? Date.now() - this.state.startTime : 0;

    this.setState({
      uptime: convertMS(uptime)
    });
  }

  render() {
    const { metrics } = this.props;
    const allRequests = getLatestAttribute(metrics, "all/requests");
    const allErrors = getLatestAttribute(metrics, "all/errors.count");
    const errorPercent = allRequests
      ? calculateErrorPercent(allRequests, allErrors)
      : formatAsDecimalString(0);

    const memoryUsedPercent = getLatestAttribute(
      metrics,
      "memory/used_percent",
      3
    );
    const memoryAvail = getLatestAttribute(
      metrics,
      "memory/available",
      3,
      "B",
      "GB"
    );
    const hostname = window.location.hostname;
    const port =
      window.location.port ||
      (window.location.protocol === "https:" ? 443 : 80);
    return (
      <ErrorBoundary>
        <LayoutSection title={"Vitals"}>
          <ReadoutGroup>
            <Readout
              readoutItems={[
                {
                  detail: dateFormat(this.state.startTime),
                  icon: "future",
                  title: "Uptime",
                  value: this.state.uptime
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
                  )} Cores`,
                  icon: "server",
                  title: "CPU Utilization",
                  value: `${getLatestAttribute(metrics, "system/cpu.pct", 3)}%`
                },
                {
                  detail: `${memoryAvail} GB Free`,
                  icon: "server",
                  title: "Memory Utilized",
                  value: `${memoryUsedPercent}%`
                }
              ]}
            />
            <Readout
              readoutItems={[
                {
                  icon: "link",
                  title: "Host",
                  value: hostname
                },
                {
                  icon: "link",
                  title: "Port",
                  value: port
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
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
    selectedService: state.settings.selectedService,
    selectedServiceVersion: state.settings.selectedServiceVersion,
    selectedInstance: state.settings.selectedInstance
  };
}

export default connect(mapStateToProps)(SummaryGrid);
