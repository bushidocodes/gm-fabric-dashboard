import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Collapse from "react-collapse";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";
import GMLineChart from "./GMLineChart";

export default class RoutesTableLineItem extends Component {
  static propTypes = {
    errorRate: PropTypes.string.isRequired,
    requestsPerSecond_dygraph: PropTypes.array.isRequired,
    requestsPerSecond_sparkline: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
    totalRequests: PropTypes.number.isRequired,
    verb: PropTypes.string.isRequired
  };

  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <li
        className={"selectable open-" + this.state.isOpen}
        onClick={this.toggleDrawer}
        onKeyDown={evt => {
          if (evt.keyCode === 13) {
            evt.preventDefault();
            this.toggleDrawer();
          }
        }}
        role="link"
      >
        <div className="routes-table-route">
          {this.props.route}
          <div className={"route-viz-bar err-pc-" + this.props.errorRate}>
            <div className="route-viz-fill" style={{ width: "50%" }} />
          </div>
        </div>
        <div className="routes-table-sparkline">
          <Sparklines
            data={this.props.requestsPerSecond_sparkline}
            height={32}
            preserveAspectRatio="xMaxYMin"
          >
            <SparklinesLine
              style={{
                stroke: "currentColor",
                strokeWidth: 1,
                fill: "none"
              }}
            />
            <SparklinesReferenceLine
              style={{
                stroke: "grey",
                opacity: "0.4"
              }}
              type="mean"
            />
          </Sparklines>
        </div>
        <div className="routes-table-total-requests routes-table-monospace">
          {this.props.totalRequests}
        </div>
        <div
          className={
            "routes-table-error-percent routes-table-monospace err-pc-" +
            this.props.errorRate
          }
        >
          {this.props.errorRate}
        </div>

        <Collapse className="table-drawer" isOpened={this.state.isOpen}>
          <GMLineChart
            timeSeries={this.props.requestsPerSecond_dygraph}
            title={"Requests over Time for " + this.props.route}
          />
        </Collapse>
      </li>
    );
  }
}
