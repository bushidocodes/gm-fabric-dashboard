import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Button from "../Button.js";
import { connect } from "react-redux";

import ThreadsTable from "./ThreadsTable";
import { getVisibleThreads, getThreadCounts } from "../../utils/jvm/selectors";

/**
 * Section containing a ThreadsTable and buttons to control what is rendered in that table
 * @class ThreadsSection
 * @extends {Component}
 */
class ThreadsSection extends Component {
  static propTypes = {
    threadCounts: PropTypes.object,
    threads: PropTypes.array
  };
  render() {
    const { threadCounts, threads } = this.props;
    //TODO: figure out why there's an empty className on the parent DIV
    return (
      <div className="">
        <div className="toolbar">
          <div className="toolbar-center">
            <Button
              clickAction={() => Actions.setThreadsFilter("all")}
              disabled={!threadCounts.all}
              label={"All Threads"}
              suffix={threadCounts.all}
              tabIndex={15}
            />
            <span className="uk-button-group uk-margin-left">
              <Button
                clickAction={() => Actions.setThreadsFilter("active")}
                disabled={!threadCounts.active}
                label={"Active"}
                suffix={threadCounts.active}
                tabIndex={16}
              />
              <Button
                clickAction={() => Actions.setThreadsFilter("idle")}
                disabled={!threadCounts.idle}
                label={"Idle"}
                suffix={threadCounts.idle}
                tabIndex={17}
              />
              <Button
                clickAction={() => Actions.setThreadsFilter("stopped")}
                disabled={!threadCounts.stopped}
                label={"Stopped"}
                suffix={threadCounts.stopped}
                tabIndex={18}
              />
            </span>
          </div>
        </div>
        <ThreadsTable filteredThreadData={threads} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  threads: getVisibleThreads(state),
  threadCounts: getThreadCounts(state)
});

export default connect(mapStateToProps)(ThreadsSection);
