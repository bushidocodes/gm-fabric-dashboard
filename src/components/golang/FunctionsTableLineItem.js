import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Collapse from "react-collapse";
import GMLineChart from "../GMLineChart";

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
    throughput_dygraph: PropTypes.object.isRequired
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
        <div className="routes-table-total-requests routes-table-monospace">
          {this.props.inThroughput}
        </div>
        <div className={"routes-table-error-percent routes-table-monospace"}>
          {this.props.outThroughput}
        </div>
        <div className={"routes-table-total-requests routes-table-monospace"}>
          {this.props.errorsCount}
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
            timeSeries={this.props.throughput_dygraph}
            title={"Throughput over time for " + this.props.func}
          />
        </Collapse>
      </li>
    );
  }
}
