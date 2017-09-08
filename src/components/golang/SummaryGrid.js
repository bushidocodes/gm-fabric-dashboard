import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import GMLineChart from "../GMLineChart.js";
import PageTitle from "../PageTitle.js";
import Readout from "../Readout.js";
import ReadoutItem from "../ReadoutItem.js";
import LayoutSection from "../LayoutSection.js";

import { getDygraphOfValue } from "../../utils/dygraphs";
import { getLatestAttribute } from "../../utils/latestAttribute";
import { getServicename } from "../../utils/head";

/**
 * Static Summary page for Golang runtime
 * @class SummaryGrid
 * @extends {Component}
 */
class SummaryGrid extends Component {
  static propTypes = {
    metrics: PropTypes.object
  };
  render() {
    const { metrics } = this.props;
    const hostname = window.location.hostname;
    const port =
      window.location.port ||
      (window.location.protocol === "https:" ? 443 : 80);
    return (
      <div>
        <PageTitle title={`${getServicename()}: Instance 1`} />
        <LayoutSection title={"Vitals"}>
          <div className="subsection">
            <div className="readout-dashboard-row">
              <Readout type={"readout-primary"}>
                <ReadoutItem
                  icon={"bolt"}
                  title={"Avg. Response Time"}
                  value={`${getLatestAttribute(
                    metrics,
                    "route/all/latency_ms.avg",
                    3,
                    "ms",
                    "s"
                  )} s`}
                />
                <ReadoutItem
                  icon={"warning"}
                  title={"Error Total"}
                  value={getLatestAttribute(metrics, "route/all/errors.count")}
                />
              </Readout>
              <Readout>
                <ReadoutItem
                  icon={"server"}
                  title={"Cores"}
                  value={getLatestAttribute(metrics, "system/cpu_cores")}
                />
                <ReadoutItem
                  icon={"server"}
                  title={"Percent Utilized"}
                  value={`${getLatestAttribute(
                    metrics,
                    "system/cpu.pct",
                    3
                  )} %`}
                />
              </Readout>
              <Readout>
                <ReadoutItem
                  icon={"server"}
                  title={"Memory Used"}
                  value={`${getLatestAttribute(
                    metrics,
                    "memory/used",
                    3,
                    "B",
                    "GB"
                  )} GB`}
                />
                <ReadoutItem
                  icon={"server"}
                  title={"Memory Available"}
                  value={`${getLatestAttribute(
                    metrics,
                    "memory/available",
                    3,
                    "B",
                    "GB"
                  )} GB`}
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
              timeSeries={getDygraphOfValue(
                metrics,
                ["memory/used_percent", "system/cpu.pct"],
                ["% Memory Used", "% CPU Used"]
              )}
              title="Resource Utilization"
            />
          </div>
        </LayoutSection>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics
  };
}

export default connect(mapStateToProps)(SummaryGrid);
