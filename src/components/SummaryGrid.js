import dateFormat from "dateformat";
import ms from "ms";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitle from "./PageTitle.js";
import Readout from "./Readout.js";
import ReadoutItem from "./ReadoutItem.js";
import LayoutSection from "./LayoutSection.js";

import { getLatestAttribute } from "../utils/latestAttribute";

class SummaryGrid extends Component {
  static propTypes = {
    metrics: PropTypes.object
  };
  render() {
    const { metrics } = this.props;
    const hostname = window.location.hostname;
    const port = window.location.port || 80;
    return (
      <div>
        <PageTitle title={"Service Name: Instance Name"} />
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
                  value={"22.15ms"}
                />
                <ReadoutItem
                  icon={"warning"}
                  title={"Error Rate"}
                  value={"0.120%"}
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

        <LayoutSection title={"Statistics"} />
      </div>
    );
  }
}

function mapStateToProps({ metrics }) {
  return { metrics };
}

export default connect(mapStateToProps)(SummaryGrid);
