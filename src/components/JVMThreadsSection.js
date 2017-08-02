import React, { Component } from "react";
import { PropTypes } from "prop-types";
import JVMThreadsTable from "./JVMThreadsTable";
import { Actions } from "jumpstate";
import { connect } from "react-redux";
import { getVisibleThreads, getThreadCounts } from "../utils";

class JVMThreadsSection extends Component {
  static propTypes = {
    threadCounts: PropTypes.object,
    threads: PropTypes.array
  };
  render() {
    const { threadCounts, threads } = this.props;
    return (
      <div className="uk-card uk-card-default">
        <div className="thread-table-filter-buttons uk-button-group">
          <button
            className="btn"
            disabled={!threadCounts.all}
            onClick={() => Actions.setThreadsFilter("all")}
            tabIndex={15}
          >
            <span className="label">All Threads </span>
            <span className="label">
              {threadCounts.all}
            </span>
          </button>

          <span className="uk-button-group uk-margin-left">
            <button
              className="btn"
              disabled={!threadCounts.active}
              onClick={() => Actions.setThreadsFilter("active")}
              tabIndex={16}
            >
              <span className="label">Active </span>
              <span className="label">
                {threadCounts.active}
              </span>
            </button>
            <button
              className="btn"
              disabled={!threadCounts.idle}
              onClick={() => Actions.setThreadsFilter("idle")}
              tabIndex={17}
            >
              <span className="label">Idle </span>
              <span className="label">
                {threadCounts.idle}
              </span>
            </button>
            <button
              className="btn"
              disabled={!threadCounts.stopped}
              onClick={() => Actions.setThreadsFilter("stopped")}
              tabIndex={18}
            >
              <span className="label">Stopped </span>
              <span className="label">
                {threadCounts.stopped}
              </span>
            </button>
          </span>
        </div>
        <JVMThreadsTable filteredThreadData={threads} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  threads: getVisibleThreads(state),
  threadCounts: getThreadCounts(state)
});

export default connect(mapStateToProps)(JVMThreadsSection);
