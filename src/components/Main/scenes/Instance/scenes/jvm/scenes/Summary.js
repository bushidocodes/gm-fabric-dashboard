import dateFormat from "dateformat";
import _ from "lodash";
import prettyMS from "pretty-ms";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import LayoutSection from "../../../../../../LayoutSection";
import GMLineChart from "../../../../../components/GMLineChart";
import PageTitle from "../../../components/PageTitle";
import Readout from "../../../../../components/Readout";
import ReadoutGroup from "../../../../../components/ReadoutGroup";
import ReadoutItem from "../../../../../components/ReadoutItem";

import {
  getDygraphOfValue,
  mapDygraphKeysToNetChange
} from "../../../../../../../utils/dygraphs";
import { getLatestAttribute } from "../../../../../../../utils/latestAttribute";
import { getErrorRate } from "../../../../../../../utils/jvm/selectors";
import { getServiceName } from "../../../../../../../utils/head";
import { trimID } from "../../../../../../../utils";

class SummaryGrid extends Component {
  static propTypes = {
    errorRate: PropTypes.string,
    metrics: PropTypes.object,
    selectedInstance: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string
  };
  render() {
    const {
      errorRate,
      metrics,
      selectedInstance,
      selectedService,
      selectedServiceVersion
    } = this.props;
    const hostname = window.location.hostname;
    const port =
      window.location.port ||
      (window.location.protocol === "https:" ? 443 : 80);
    return (
      <div>
        <PageTitle
          title={`${selectedService ||
            getServiceName()} ${selectedServiceVersion} : ${trimID(
            selectedInstance
          )}`}
        />
        <LayoutSection title={"Vitals"}>
          <ReadoutGroup>
            <Readout>
              <ReadoutItem
                detail={dateFormat(
                  getLatestAttribute(metrics, "jvm/start_time")
                )}
                icon={"future"}
                title={"Uptime"}
                value={prettyMS(
                  _.round(getLatestAttribute(metrics, "jvm/uptime"), -3)
                )}
              />
            </Readout>

            <Readout primary="true">
              <ReadoutItem
                icon={"bolt"}
                title={"Avg. Response Time"}
                value={prettyMS(
                  _.round(getLatestAttribute(metrics, "time/2XX.avg"), -3)
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
          </ReadoutGroup>
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
    selectedService: state.settings.selectedService,
    selectedServiceVersion: state.settings.selectedServiceVersion,
    selectedInstance: state.settings.selectedInstance,
    errorRate: getErrorRate(state)
  };
}

export default connect(mapStateToProps)(SummaryGrid);
