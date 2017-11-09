import { PropTypes } from "prop-types";
import React, { Component } from "react";

import IndicatorIcon from "./components/IndicatorIcon";

import StackTrace from "components/Main/components/StackTrace";
import TableCol from "components/Main/components/TableCol";
import TableColThread from "components/Main/components/TableColThread";
import TableColDaemon from "components/Main/components/TableColDaemon";
import TableDrawerCollapse from "components/Main/components/TableDrawerCollapse";
import TableRow from "components/Main/components/TableRow";

import Icon from "components/Icon";
import Glyph from "components/Glyphs/";

/**
 * Line Item containing threads data. Intended to be child of TreadsTable
 * @export
 * @class ThreadsTableLineItem
 * @extends {Component}
 */
export default class ThreadsTableLineItem extends Component {
  static propTypes = {
    arrIndex: PropTypes.number,
    daemon: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
    priority: PropTypes.number,
    stack: PropTypes.array,
    state: PropTypes.string
  };

  state = {
    isOpen: false // Is the drawer with the stacktrace open or not
  };

  /**
   * Takes a state and returns a corresponding color associated with that state
   * @param {string} state
   * @returns string
   * @memberof ThreadsTableLineItem
   */
  indicatorColor(state) {
    switch (state) {
      case "RUNNABLE":
        return "#0aab2a";
      case "WAITING":
      case "TIMED_WAITING":
        return "#F5A623";
      case "TERMINATED":
      case "BLOCKED":
      case "NEW":
        return "#BC1C1C";
      default:
        return "blue";
    }
  }

  /**
   * Toggles the stacktrace drawer open or closed
   * @memberof ThreadsTableLineItem
   */
  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { daemon, id, name, priority, stack, state } = this.props;
    const indicatorIcon = this.indicatorColor(state);

    return (
      <TableRow
        selectable={this.state.isOpen}
        key={id}
        onClick={stack.length > 0 ? this.toggleStack : () => {}}
        onKeyDown={evt => {
          if (stack.length && evt.keyCode === 13) {
            evt.preventDefault();
            this.toggleStack();
          }
        }}
        role="link"
        style={stack.length ? { cursor: "pointer" } : {}}
        tabIndex={0}
      >
        <TableColThread paddingLeft>{`${Number(id)}`}</TableColThread>
        <TableColThread style={{ textAlign: "right" }}>
          <IndicatorIcon alt={state} color={indicatorIcon} diameter={15} />
        </TableColThread>
        <TableColThread>
          {stack.length ? (
            <Icon>
              <Glyph name="Threads" />
            </Icon>
          ) : (
            ""
          )}
        </TableColThread>
        <TableCol style={{ flex: "1 1 auto" }}>{name}</TableCol>
        <TableColDaemon>{daemon ? "Yes" : "No"}</TableColDaemon>
        <TableColDaemon>{priority}</TableColDaemon>
        <TableDrawerCollapse
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <StackTrace>
            <div>{`java.lang.Thread.State: ${state}`}</div>
            {stack.map((value, index) => (
              <div key={index}>{`at ${value}`}</div>
            ))}
          </StackTrace>
        </TableDrawerCollapse>
      </TableRow>
    );
  }
}
