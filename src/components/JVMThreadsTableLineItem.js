import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Collapse from "react-collapse";

import IndicatorIcon from "./IndicatorIcon";

export default class JVMThreadsTableLineItem extends Component {
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
    isOpen: false
  };

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

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { arrIndex, daemon, id, name, priority, stack, state } = this.props;
    const indicatorIcon = this.indicatorColor(state);

    return (
      <li
        className={
          stack.length ? this.state.isOpen ? (
            "selectable open"
          ) : (
            "selectable"
          ) : (
            ""
          )
        }
        key={id}
        onClick={stack.length && this.toggleStack}
        onKeyDown={evt => {
          if (stack.length && evt.keyCode === 13) {
            evt.preventDefault();
            this.toggleStack();
          }
        }}
        role="link"
        style={stack.length ? { cursor: "pointer" } : {}}
        tabIndex={arrIndex + 20}
      >
        <div className="thread-table-id">{`${Number(id)}`}</div>
        <div className="thread-table-state">
          <IndicatorIcon alt={state} color={indicatorIcon} diameter={15} />
        </div>
        <div className="thread-table-stacktrace">
          {stack.length ? (
            <span
              className="stack-trace-indicator icon"
              data-uk-icon={"icon: table;"}
            />
          ) : (
            ""
          )}
        </div>
        <div className="thread-table-name">{name}</div>
        <div className="thread-table-daemon">{daemon ? "Yes" : "No"}</div>
        <div className="thread-table-priority">{priority}</div>
        <Collapse
          className="table-drawer"
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <div className="stack-trace content-type-code">
            <div>{`java.lang.Thread.State: ${state}`}</div>
            {stack.map((value, index) => (
              <div key={index}>{`at ${value}`}</div>
            ))}
          </div>
        </Collapse>
      </li>
    );
  }
}
