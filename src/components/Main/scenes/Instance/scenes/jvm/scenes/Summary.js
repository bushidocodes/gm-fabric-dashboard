import dateFormat from "dateformat";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import LayoutSection from "../../../../../../LayoutSection";
import GMLineChart from "../../../../../components/GMLineChart";
import PageTitle from "../../../components/PageTitle";
import Readout from "../../../../../components/Readout";
import ReadoutGroup from "../../../../../components/ReadoutGroup";
import ErrorBoundary from "../../../../../../library/ErrorBoundary";
import {
  getDygraphOfValue,
  mapDygraphKeysToNetChange
} from "../../../../../../../utils/dygraphs";
import { getLatestAttribute } from "../../../../../../../utils/latestAttribute";
import { getErrorPercent } from "../../../../../../../utils/jvm/selectors";
import { getServiceName } from "../../../../../../../utils/head";
import { trimID, convertMS } from "../../../../../../../utils";

class SummaryGrid extends Component {
  static propTypes = {
    errorPercent: PropTypes.string,
    metrics: PropTypes.object,
    selectedInstance: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string
  };

  state = {
    _timer: null,
    startTime: getLatestAttribute(this.props.metrics, "jvm/start_time"),
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
      "jvm/start_time"
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
    const {
      errorPercent,
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
      <ErrorBoundary>
        <PageTitle
          title={`${selectedService ||
            getServiceName()} ${selectedServiceVersion} : ${trimID(
            selectedInstance
          )}`}
        />
        <LayoutSection title={"Vitals"}>
          <ReadoutGroup>
            <Readout
              readoutItems={[
                {
                  detail: dateFormat(
                    getLatestAttribute(metrics, "jvm/start_time")
                  ),
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
                    getLatestAttribute(metrics, "time/2XX.avg")
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
                  icon: "server",
                  title: "Cores",
                  value: `${getLatestAttribute(metrics, "jvm/num_cpus")}`
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
                  ["https/requests", "http/requests"],
                  ["HTTPS", "HTTP"]
                ),
                ["HTTPS", "HTTP"]
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
    selectedInstance: state.settings.selectedInstance,
    errorPercent: getErrorPercent(state)
  };
}

export default connect(mapStateToProps)(SummaryGrid);
