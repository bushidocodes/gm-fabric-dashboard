import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";

import GMLineChart from "components/Main/components/GMLineChart";
import SparklineCol from "components/Main/components/SparklineCol";
import TableCol from "components/Main/components/TableCol";
import TableColVizBar from "components/Main/components/TableColVizBar";
import TableDrawerCollapse from "components/Main/components/TableDrawerCollapse";
import TableRow from "components/Main/components/TableRow";
import VizBar from "components/Main/components/VizBar";
import VizFill from "components/Main/components/VizFill";
import Badge from "components/Main/scenes/Instance/components/Badge";
import Icon from "components/Icon";
import Glyph from "components/Glyphs/index";

/**
 * A row of data in RoutesTable
 * @export
 * @class RoutesTableLineItem
 * @extends {Component}
 */
export default class RoutesTableLineItem extends Component {
  static propTypes = {
    errorPercent: PropTypes.string.isRequired,
    latency50: PropTypes.number.isRequired,
    latency99: PropTypes.number.isRequired,
    relativeReqPercent: PropTypes.number,
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
        <TableColVizBar>
          <Badge>
            <Icon>
              <Glyph name={this.props.verb} />
            </Icon>
            {this.props.verb}
          </Badge>
          {this.props.route}
          <VizBar>
            <VizFill
              width={this.props.relativeReqPercent}
              colorDegree={Number(this.props.errorPercent)}
            />
          </VizBar>
        </TableColVizBar>
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
        <TableCol style={{ textAlign: "right" }}>
          {this.props.totalRequests.toLocaleString()}
        </TableCol>
        <TableCol
          style={{ textAlign: "right" }}
          errorPercent={this.props.errorPercent}
        >
          {this.props.errorPercent}%
        </TableCol>
        <TableCol style={{ textAlign: "right" }}>
          {this.props.latency50}
        </TableCol>
        <TableCol style={{ textAlign: "right" }}>
          {this.props.latency99}
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
