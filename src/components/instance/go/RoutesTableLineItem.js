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
 * A row of data in the Go RoutesTable
 * @export
 * @class RoutesTableLineItem
 * @extends {Component}
 */
export default class RoutesTableLineItem extends Component {
  static propTypes = {
    errorsCount: PropTypes.number.isRequired,
    latency50: PropTypes.number.isRequired,
    latency99: PropTypes.number.isRequired,
    requests: PropTypes.number.isRequired,
    requestsPerSecond_dygraph: PropTypes.array.isRequired,
    requestsPerSecond_sparkline: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
    verb: PropTypes.string.isRequired
  };

  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    // round off any float points after three decimal places.  integers will not have trailing zeros
    let errorPercent = this.props.requests
      ? Math.round(
          (1 -
            (this.props.requests - this.props.errorsCount) /
              this.props.requests) *
            100 *
            1000
        ) / 1000
      : 0;

    // roundsTable.scss calculates the error percentage color based on the percentage value.  the mix function in scss takes value of percentage so it will be on the green scale up to 30%, brown between 30%~60%, then get closer to red above 70%.
    // errorPercent = 10;
    // errorPercent = 34.77;
    // errorPercent = 43.77;
    // errorPercent = 50;
    // errorPercent = 76.888;
    // errorPercent = 100;

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
        tabIndex="0"
      >
        <div className="routes-table-route">
          <span className="uk-badge uk-margin-right">{this.props.verb}</span>
          {this.props.route}
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
        <div className={"routes-table-error-percent routes-table-monospace"}>
          {this.props.requests}
        </div>
        <div
          className={
            "routes-table-error-percent routes-table-monospace err-pc-" +
            parseInt(errorPercent / 10, 10)
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
            title={"Requests per Second for " + this.props.route}
          />
        </Collapse>
      </li>
    );
  }
}
