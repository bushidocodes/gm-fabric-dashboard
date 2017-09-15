import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Collapse from "react-collapse";
import { Link } from "react-router-dom";

import IndicatorIcon from "../library/IndicatorIcon";

import { trimID } from "../../utils";

export default class FabricTableLineItem extends Component {
  static propTypes = {
    arrIndex: PropTypes.number,
    service: PropTypes.object
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

  /**
 * Helper function that pads and array to a desired length. Added elements are empty strings
 * @param {*} arr - The array that we want to pad 
 * @param {*} length - The desired length
 */
  padArray(arr, length) {
    if (arr.length >= length) {
      return arr;
    } else {
      const result = Object.assign(Array(length).fill(""), arr);
      return result;
    }
  }

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {
      arrIndex,
      service: {
        authorized,
        counts: { maximum, minimum },
        // documentation,
        // group,
        instances,
        // metered,
        name
        // runtime,
        // threaded
      }
    } = this.props;
    // const indicatorIcon = this.indicatorColor(state);
    const indicatorIcon = "#0aab2a";
    return (
      <li
        className={
          instances.length ? this.state.isOpen ? (
            "selectable open-true"
          ) : (
            "selectable open-false"
          ) : (
            ""
          )
        }
        key={name}
        onClick={instances.length && this.toggleStack}
        onKeyDown={evt => {
          if (instances.length && evt.keyCode === 13) {
            evt.preventDefault();
            this.toggleStack();
          }
        }}
        role="link"
        style={instances.length && authorized ? { cursor: "pointer" } : {}}
        tabIndex={arrIndex + 20}
      >
        <div className="thread-table-state">
          <IndicatorIcon alt={"state"} color={indicatorIcon} diameter={15} />
        </div>
        <div className="thread-table-name">{name}</div>
        <div className="thread-table-stacktrace">
          {instances.length ? (
            <span
              className="stack-trace-indicator icon"
              data-uk-icon={"icon: table;"}
            />
          ) : (
            ""
          )}
        </div>
        <Collapse
          className="table-drawer"
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <div>
            <ul
              className="instances-list"
              data-instances-current={instances.length}
              data-instances-max={maximum}
              data-instances-min={minimum}
            >
              {this.padArray(instances, maximum).map((instance, index) => {
                if (instance !== "") {
                  return (
                    <Link key={instance} to={`/${name}/${instance}`}>
                      <li
                        className={`instance-slot ${index === minimum
                          ? "instance-min"
                          : ""}`}
                      >
                        <span className="instance-name">
                          {trimID(instance)}
                        </span>
                      </li>
                    </Link>
                  );
                } else {
                  return <li key={index} className="instance-slot" />;
                }
              })}
            </ul>
          </div>
        </Collapse>
      </li>
    );
  }
}
