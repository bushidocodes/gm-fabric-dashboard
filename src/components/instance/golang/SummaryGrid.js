import dateFormat from "dateformat";
import ms from "ms";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import GMLineChart from "../../library/GMLineChart";
import LayoutSection from "../../library/LayoutSection.js";
import PageTitle from "../../library/PageTitle.js";
import Readout from "../../library/Readout.js";
import ReadoutItem from "../../library/ReadoutItem.js";

import {
  getDygraphOfValue,
  mapDygraphKeysToNetChange
} from "../../../utils/dygraphs";
import { getLatestAttribute } from "../../../utils/latestAttribute";
import { getServiceName } from "../../../utils/head";
import { trimID } from "../../../utils";

/**
 * Static Summary page for Golang runtime
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
  render() {
    const {
      metrics,
      selectedInstance,
      selectedService,
      selectedServiceVersion
    } = this.props;
    const startTime = getLatestAttribute(metrics, "system/start_time");
    const allRequests = getLatestAttribute(metrics, "all/requests");
    const allErrors = getLatestAttribute(metrics, "all/errors.count");
    const errorRate =
      allRequests > 0 ? (1 - (allRequests - allErrors) / allRequests) * 100 : 0;
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
    const uptime = startTime > 0 ? Date.now() - startTime : 0;
    return (
      <div>
        <PageTitle
          title={`${selectedService ||
            getServiceName()} ${selectedServiceVersion} : ${trimID(
            selectedInstance
          )}`}
        />
        <LayoutSection title={"Vitals"}>
          <div className="subsection">
            <div className="readout-dashboard-row">
              <Readout>
                <ReadoutItem
                  detail={dateFormat(startTime)}
                  icon={"future"}
                  title={"Uptime"}
                  value={ms(uptime)}
                />
              </Readout>
              <Readout type={"readout-primary"}>
                <ReadoutItem
                  icon={"bolt"}
                  title={"Avg. Response Time"}
                  value={`${getLatestAttribute(
                    metrics,
                    "all/latency_ms.avg",
                    5,
                    "ms",
                    "s"
                  )}s`}
                />
                <ReadoutItem
                  icon={"warning"}
                  title={"Error Rate"}
                  value={`${errorRate}%`}
                />
              </Readout>
              <Readout>
                <ReadoutItem
                  detail={`${getLatestAttribute(
                    metrics,
                    "system/cpu_cores"
                  )} Cores`}
                  icon={"server"}
                  title={"CPU Utilization"}
                  value={`${getLatestAttribute(metrics, "system/cpu.pct", 3)}%`}
                />
                <ReadoutItem
                  detail={`${memoryAvail} GB Free`}
                  icon={"server"}
                  title={"Memory Utilized"}
                  value={`${memoryUsedPercent}%`}
                />
              </Readout>
              <Readout>
                <ReadoutItem icon={"link"} title={"Host"} value={hostname} />
                <ReadoutItem icon={"link"} title={"Port"} value={port} />
              </Readout>
            </div>
          </div>
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
      </div>
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
