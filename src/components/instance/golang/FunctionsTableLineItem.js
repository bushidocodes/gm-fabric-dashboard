import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Collapse from "react-collapse";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";
import GMLineChart from "../../library/GMLineChart";

/**
 * A row of data in the Golang FunctionsTable 
 * @export
 * @class FunctionsTableLineItem
 * @extends {Component}
 */
export default class FunctionsTableLineItem extends Component {
  static propTypes = {
    errorsCount: PropTypes.number.isRequired,
    func: PropTypes.string.isRequired,
    inThroughput: PropTypes.number.isRequired,
    latency50: PropTypes.number.isRequired,
    latency99: PropTypes.number.isRequired,
    outThroughput: PropTypes.number.isRequired,
    requests: PropTypes.number.isRequired,
    requestsPerSecond_dygraph: PropTypes.array.isRequired,
    requestsPerSecond_sparkline: PropTypes.array.isRequired
  };

  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const errorPercent =
      (1 -
        (this.props.requests - this.props.errorsCount) / this.props.requests) *
      100;

    return (
      <li
        className={this.state.isOpen ? "selectable open" : "selectable"}
        onClick={this.toggleDrawer}
        onKeyDown={evt => {
          if (evt.keyCode === 13) {
            evt.preventDefault();
            this.toggleDrawer();
          }
        }}
        role="link"
      >
        <div className="routes-table-route">{this.props.func}</div>
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
        <div className={"routes-table-error-percent routes-table-monospace"}>
          {this.props.requests}
        </div>
        <div
          className={
            "routes-table-error-percent routes-table-monospace err-pc-" +
            errorPercent
          }
        >
          {`${errorPercent}%`}
        </div>
        <div className={"routes-table-total-requests routes-table-monospace"}>
          {this.props.latency50}
        </div>
        <div className={"routes-table-total-requests routes-table-monospace"}>
          {this.props.latency99}
        </div>

        <Collapse
          className="table-drawer"
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <GMLineChart
            timeSeries={this.props.requestsPerSecond_dygraph}
            title={"Requests Per Second for " + this.props.func}
          />
        </Collapse>
      </li>
    );
  }
}
