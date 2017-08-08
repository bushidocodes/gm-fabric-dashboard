import dateFormat from "dateformat";
import ms from "ms";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import PageTitle from "./PageTitle.js";
import LayoutSection from "./LayoutSection.js";

import { getLatestAttribute } from "../utils/latestAttribute";

class SummaryGrid extends Component {
  static propTypes = {
    metrics: PropTypes.object
  };
  render() {
    const { metrics } = this.props;
    return (
      <div>
        <PageTitle title={"Service Name: Instance Name"} />
        <LayoutSection className={"test"} title={"Basics"}>
          <div className="subsection">
            <ul className="object-diagram">
              <li className="object-feature">
                <div className="object-feature-icon">
                  <span data-uk-icon={`icon: grid; ratio: 1`} />
                </div>
                <div className="object-feature-data">
                  <h2 className="object-feature-title">Avg. Response Time</h2>
                  <span className="object-feature-value">22.15ms</span>
                </div>
              </li>
              <li className="object-feature">
                <div className="object-feature-icon">
                  <span data-uk-icon={`icon: grid; ratio: 1`} />
                </div>
                <div className="object-feature-data">
                  <h2 className="object-feature-title">Error Rate</h2>
                  <span className="object-feature-value">0.12%</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="subsection">
            <div className="kv-table kv-lg">
              <div className="kv-pair">
                <span className="kv-key">Start Time</span>
                <span className="kv-value">
                  {dateFormat(getLatestAttribute(metrics, "jvm/start_time"))}
                </span>
              </div>
              <div className="kv-pair">
                <span className="kv-key">Uptime</span>
                <span className="kv-value">
                  {ms(getLatestAttribute(metrics, "jvm/uptime"))}
                </span>
              </div>
              <hr />
              <div className="kv-pair">
                <span className="kv-key">Processor Cores</span>
                <span className="kv-value">
                  {getLatestAttribute(metrics, "jvm/num_cpus")}
                </span>
              </div>
              <div className="kv-pair">
                <span className="kv-key">Address or Domain Name</span>
                <span className="kv-value">
                  {`${window.location.hostname}:${window.location.port}`}
                </span>
              </div>
            </div>
          </div>
        </LayoutSection>
      </div>
    );
  }
}

function mapStateToProps({ metrics }) {
  return { metrics };
}

export default connect(mapStateToProps)(SummaryGrid);
