import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

// Importing external deps from src as WebPack Modules directory
import ButtonGroup from "components/ButtonGroup";
import StyledButton from "components/StyledButton";
import StyledButtonRoundedLeft from "components/StyledButtonRoundedLeft";
import StyledButtonRoundedRight from "components/StyledButtonRoundedRight";
import SecondaryText from "components/SecondaryText";
import Toolbar from "components/Main/components/Toolbar";
import ToolbarCenter from "components/Main/components/ToolbarCenter";

/**
 * Toolbar containing buttons to control what is rendered in the threads table
 * @class ThreadsTableToolbar
 * @extends {Component}
 */
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
            <StyledButtonRoundedLeft
              onClick={() => Actions.setThreadsFilter("all")}
              disabled={!threadCounts.all}
              selected={threadsFilter === "all"}
              tabIndex={0}
            >
              All Threads
              <SecondaryText>{threadCounts.all}</SecondaryText>
            </StyledButtonRoundedLeft>
            <StyledButton
              onClick={() => Actions.setThreadsFilter("active")}
              disabled={!threadCounts.active}
              selected={threadsFilter === "active"}
              tabIndex={0}
            >
              Active
              <SecondaryText>{threadCounts.active}</SecondaryText>
            </StyledButton>
            <StyledButton
              onClick={() => Actions.setThreadsFilter("idle")}
              disabled={!threadCounts.idle}
              selected={threadsFilter === "idle"}
              tabIndex={0}
            >
              Idle
              <SecondaryText>{threadCounts.idle}</SecondaryText>
            </StyledButton>
            <StyledButtonRoundedRight
              onClick={() => Actions.setThreadsFilter("stopped")}
              disabled={!threadCounts.stopped}
              selected={threadsFilter === "stopped"}
              tabIndex={0}
            >
              Stopped
              <SecondaryText>{threadCounts.stopped}</SecondaryText>
            </StyledButtonRoundedRight>
          </ButtonGroup>
        </ToolbarCenter>
      </Toolbar>
    );
  }
}

export default ThreadsTableToolbar;
