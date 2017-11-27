import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

// Importing external deps from src as WebPack Modules directory
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import Toolbar from "components/Main/components/Toolbar";
import ToolbarCenter from "components/Main/components/ToolbarCenter";

/**
 * Toolbar containing buttons to control what is rendered in the threads table
 * @class ThreadsTableToolbar
 * @extends {Component}
 */

// TODO: Make threadCounts a Shape PropType
class ThreadsTableToolbar extends Component {
  static propTypes = {
    threadCounts: PropTypes.object,
    threadsFilter: PropTypes.string
  };
  render() {
    const { threadCounts, threadsFilter } = this.props;
    //TODO: figure out why there's an empty className on the parent DIV
    return (
      <Toolbar>
        <ToolbarCenter>
          <ButtonGroup>
            <Button
              active={threadsFilter === "all"}
              clickAction={() => Actions.setThreadsFilter("all")}
              disabled={!threadCounts.all}
              tabIndex={0}
              label="All Threads"
              suffix={threadCounts.all}
            />

            <Button
              active={threadsFilter === "active"}
              clickAction={() => Actions.setThreadsFilter("active")}
              disabled={!threadCounts.active}
              tabIndex={0}
              label="Active"
              suffix={threadCounts.active}
            />
            <Button
              active={threadsFilter === "idle"}
              clickAction={() => Actions.setThreadsFilter("idle")}
              disabled={!threadCounts.idle}
              tabIndex={0}
              label="Idle"
              suffix={threadCounts.idle}
            />
            <Button
              active={threadsFilter === "stopped"}
              clickAction={() => Actions.setThreadsFilter("stopped")}
              disabled={!threadCounts.stopped}
              tabIndex={0}
              label="Stopped"
              suffix={threadCounts.stopped}
            />
          </ButtonGroup>
        </ToolbarCenter>
      </Toolbar>
    );
  }
}

export default ThreadsTableToolbar;
