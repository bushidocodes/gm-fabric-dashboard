import dateFormat from "dateformat";
import ms from "ms";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import GMLineChart from "./GMLineChart.js";
import PageTitle from "./PageTitle.js";
import Readout from "./Readout.js";
import ReadoutItem from "./ReadoutItem.js";
import LayoutSection from "./LayoutSection.js";
import _ from "lodash";

import {
  getDygraphOfValue,
  mapDygraphKeysToNetChange
} from "../utils/dygraphs";
import { getLatestAttribute } from "../utils/latestAttribute";
import { getErrorRate } from "../utils/routes";
import { getServicename } from "../utils/head";

class SummaryGrid extends Component {
  static propTypes = {
    errorRate: PropTypes.string,
    metrics: PropTypes.object
  };
  render() {
    const { errorRate, metrics } = this.props;
    const hostname = window.location.hostname;
    const port = window.location.port || 80;
    return (
      <div>
        <PageTitle title={`${getServicename()}: Instance 1`} />
        <LayoutSection title={"Vitals"}>
          <div className="subsection">
            <div className="readout-dashboard-row">
              <Readout>
                <ReadoutItem
                  detail={dateFormat(
                    getLatestAttribute(metrics, "jvm/start_time")
                  )}
                  icon={"future"}
                  title={"Uptime"}
                  value={ms(getLatestAttribute(metrics, "jvm/uptime"))}
                />
              </Readout>

              <Readout type={"readout-primary"}>
                <ReadoutItem
                  icon={"bolt"}
                  title={"Avg. Response Time"}
                  value={ms(
                    _.round(getLatestAttribute(metrics, "time/2XX.avg"), 3)
                  )}
                />
                <ReadoutItem
                  icon={"warning"}
                  title={"Error Rate"}
                  value={`${errorRate}%`}
                />
              </Readout>

              <Readout>
                <ReadoutItem
                  icon={"server"}
                  title={"Cores"}
                  value={getLatestAttribute(metrics, "jvm/num_cpus")}
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
                  ["https/requests", "http/requests"],
                  ["HTTPS", "HTTP"]
                ),
                ["HTTPS", "HTTP"]
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
    errorRate: getErrorRate(state)
  };
}

export default connect(mapStateToProps)(SummaryGrid);
