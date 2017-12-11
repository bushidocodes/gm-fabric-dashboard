import _ from "lodash";
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
import TableColVizBar from "components/Main/components/TableColVizBar";
import SparklineCol from "components/Main/components/SparklineCol";
import TableDrawerCollapse from "components/Main/components/TableDrawerCollapse";
import VizBar from "components/Main/components/VizBar";
import VizFill from "components/Main/components/VizFill";
import Badge from "components/Main/scenes/InstanceView/components/Badge";
import Icon from "components/Icon";
import Glyph from "components/Glyphs/index";

import styled from "styled-components";

// this extra flex container is necessary to truncate route name in chrome browser
const FlexParent = styled.div`
  display: flex;
  > div {
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
`;

/**
 * A row of data in Functions and Routes table
 * @export
 * @class TableLineItem
 * @extends {Component}
 */
export default class TableLineItem extends Component {
  static propTypes = {
    errorPercent: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    latency50: PropTypes.number.isRequired,
    latency99: PropTypes.number.isRequired,
    relativeReqPercent: PropTypes.number,
    requests: PropTypes.number,
    requestsPerSecond_dygraph: PropTypes.array.isRequired,
    requestsPerSecond_sparkline: PropTypes.array.isRequired,
    verb: PropTypes.string
  };

  state = {
    isOpen: false
  };

  // In IE10, IE11, and Edge broswer, SVG elements are added to tab order by default and tabIndex is ignored.
  // setting focusable: "false" attribute to svg will make svg unfocusable.
  // Sparkline module returns its own svg element so the attribute is set here instead of being
  // set directly on svg.
  componentDidMount() {
    const SparklineSVG = document.querySelectorAll("svg[preserveAspectRatio]");
    if (!_.isEmpty(SparklineSVG))
      _.forEach(SparklineSVG, svg => svg.setAttribute("focusable", "false"));
  }

  blurTableRow = e => {
    // this is done to search up the DOM tree to find table row and take away its focus to prevent outline on click while preserving tabbing outline
    let node = e.target;
    while (
      typeof node.className !== "string" ||
      node.className.indexOf("TableRow") !== 0
    ) {
      node = node.parentNode;
    }
    node.blur();
  };

  toggleDrawer = e => {
    if (e) {
      this.blurTableRow(e);
    }

    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <TableRow
        selectable={this.state.isOpen}
        onClick={evt => this.toggleDrawer(evt)}
        onKeyDown={evt => {
          if (evt.keyCode === 13) {
            evt.preventDefault();
            this.toggleDrawer();
          }
        }}
        role="link"
      >
        <TableColVizBar>
          <FlexParent>
            {this.props.verb && (
              <Badge>
                <Icon>
                  <Glyph name={this.props.verb} />
                </Icon>
                {this.props.verb}
              </Badge>
            )}
            <div>{this.props.item}</div>
          </FlexParent>
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
          {this.props.requests && this.props.requests.toLocaleString()}
        </TableCol>
        <TableCol
          style={{ textAlign: "right" }}
          errorPercent={this.props.errorPercent}
        >
          {this.props.errorPercent}%
        </TableCol>
        <TableCol
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div>{this.props.latency50}ms</div>
          <div>{this.props.latency99}ms</div>
        </TableCol>
        <TableDrawerCollapse
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
            this.blurTableRow(evt);
          }}
        >
          <GMLineChart
            timeSeries={this.props.requestsPerSecond_dygraph}
            title={"Requests over Time for " + this.props.item}
          />
        </TableDrawerCollapse>
      </TableRow>
    );
  }
}
