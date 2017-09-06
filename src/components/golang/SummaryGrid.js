import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import PageTitle from "../PageTitle.js";
import Readout from "../Readout.js";
import ReadoutItem from "../ReadoutItem.js";
import LayoutSection from "../LayoutSection.js";

import { getLatestAttribute } from "../../utils/latestAttribute";
import { getErrorRate } from "../../utils/routes";
import { getServicename } from "../../utils/head";

/**
 * Static Summary page for Golang runtime
 * @class SummaryGrid
 * @extends {Component}
 */
class SummaryGrid extends Component {
  static propTypes = {
    errorRate: PropTypes.string,
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
              <Readout>
                <ReadoutItem
                  icon={"server"}
                  title={"Cores"}
                  value={getLatestAttribute(metrics, "system/cpu_cores")}
                />
                <ReadoutItem
                  icon={"server"}
                  title={"Percent Utilized"}
                  value={`${getLatestAttribute(metrics, "system/cpu.pct")}%`}
                />
              </Readout>

              <Readout>
                <ReadoutItem icon={"link"} title={"Host"} value={hostname} />
                <ReadoutItem icon={"link"} title={"Port"} value={port} />
              </Readout>
            </div>
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
