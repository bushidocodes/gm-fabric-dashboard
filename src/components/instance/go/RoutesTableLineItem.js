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
    // force three decimal points at all times and return language sensitive representation of number (commas and periods)
    let errorPercent = this.props.requests
      ? ((1 -
          (this.props.requests - this.props.errorsCount) /
            this.props.requests) *
          100
        ).toLocaleString(undefined, {
          maximumFractionDigits: 3,
          minimumFractionDigits: 3
        })
      : 0;

    /**
    *
    * roundsTable.scss calculates the error percentage color based on the percentage value.
    the mix function in scss takes value of percentage so it will be on the green scale up to 30%,
    brown between 30%~60%, then get closer to red above 70%.

    * className={
            "routes-table-error-percent routes-table-monospace err-pc-" .....
      currently using the scale of 0 to 10 to render color.

    * TO DO:  refactor the coloring contrast for error percent display as styled-components.  related to issue #368
    ...< 0.1% error rate is green, > 0.1% and < 1% is yellow, and >1% is red
    */
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
          <div className={"route-viz-bar err-pc-" + errorPercent}>
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
        <div className={"routes-table-error-percent routes-table-monospace"}>
          {this.props.requests}
        </div>
        <div
          className={
            "routes-table-error-percent routes-table-monospace err-pc-" +
            Math.round(errorPercent / 10)
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
