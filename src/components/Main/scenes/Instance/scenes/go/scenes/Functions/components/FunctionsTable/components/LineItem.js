import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";

import GMLineChart from "components/Main/components/GMLineChart";
import TableRow from "components/Main/components/TableRow";
import TableCol from "components/Main/components/TableCol";
import SparklineCol from "components/Main/components/SparklineCol";
import TableDrawerCollapse from "components/Main/components/TableDrawerCollapse";
import VizBar from "components/Main/components/VizBar";
import VizFill from "components/Main/components/VizFill";

/**
 * A row of data in the Go FunctionsTable
 * @export
 * @class FunctionsTableLineItem
 * @extends {Component}
 */
export default class FunctionsTableLineItem extends Component {
  static propTypes = {
    errorPercent: PropTypes.string.isRequired,
    errorsCount: PropTypes.number.isRequired,
    func: PropTypes.string.isRequired,
    latency50: PropTypes.number.isRequired,
    latency99: PropTypes.number.isRequired,
    relativeReqPercent: PropTypes.number,
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
      >
        <TableCol vizBar>
          {this.props.func}
          <VizBar>
            <VizFill width={this.props.relativeReqPercent} />
          </VizBar>
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
        <TableCol textAlign={"right"}>{this.props.requests}</TableCol>
        <TableCol
          textAlign={"right"}
          errorPercent={this.props.errorPercent}
        >{`${this.props.errorPercent}%`}</TableCol>
        <TableCol textAlign={"right"}>{this.props.latency50}</TableCol>
        <TableCol textAlign={"right"}>{this.props.latency99}</TableCol>
        <TableDrawerCollapse
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <GMLineChart
            timeSeries={this.props.requestsPerSecond_dygraph}
            title={"Requests Per Second for " + this.props.func}
          />
        </TableDrawerCollapse>
      </TableRow>
    );
  }
}
