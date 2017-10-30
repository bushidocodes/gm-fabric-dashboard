import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Badge from "../../../../../../../components/Badge";

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";

import GMLineChart from "../../../../../../../../../components/GMLineChart";
import TableRow from "../../../../../../../../../components/TableRow";
import TableCol from "../../../../../../../../../components/TableCol";
import SparklineCol from "../../../../../../../../../components/SparklineCol";
import TableDrawerCollapse from "../../../../../../../../../components/TableDrawerCollapse";

/**
 * A row of data in RoutesTable
 * @export
 * @class RoutesTableLineItem
 * @extends {Component}
 */
export default class RoutesTableLineItem extends Component {
  static propTypes = {
    errorPercent: PropTypes.string.isRequired,
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
    let errorPercent = Number(this.props.errorPercent).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 3,
        minimumFractionDigits: 3
      }
    );
    return (
      <TableRow
        selectable={this.state.isOpen}
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
        <TableCol>
          <Badge>{this.props.verb}</Badge>
          {this.props.route}
          <div className={"route-viz-bar err-pc-" + this.props.errorPercent}>
            <div className="route-viz-fill" style={{ width: "50%" }} />
          </div>
        </TableCol>
        <SparklineCol>
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
        </SparklineCol>
        <TableCol numeric={true}>
          {this.props.totalRequests.toLocaleString()}
        </TableCol>
        <TableCol numeric errorPercent={errorPercent}>
          {errorPercent}
        </TableCol>

        <TableDrawerCollapse
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <GMLineChart
            timeSeries={this.props.requestsPerSecond_dygraph}
            title={"Requests over Time for " + this.props.route}
          />
        </TableDrawerCollapse>
      </TableRow>
    );
  }
}
