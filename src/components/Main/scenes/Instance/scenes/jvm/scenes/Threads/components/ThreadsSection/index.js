import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

// Importing internal subcomponents
import ThreadsTable from "./components/ThreadsTable";
import ThreadsTableToolbar from "./components/ThreadsTableToolbar";

// Importing external deps from src as WebPack Modules directory
import { getVisibleThreads, getThreadCounts } from "utils/jvm/selectors";

/**
 * Section containing a ThreadsTable and buttons to control what is rendered in that table
 * @class ThreadsSection
 * @extends {Component}
 */
class ThreadsSection extends Component {
  static propTypes = {
    threadCounts: PropTypes.object,
    threads: PropTypes.array,
    threadsFilter: PropTypes.string
  };
  render() {
    const { threadCounts, threads, threadsFilter } = this.props;
    return (
      <div>
        <ThreadsTableToolbar
          threadCounts={threadCounts}
          threadsFilter={threadsFilter}
        />
        <ThreadsTable filteredThreadData={threads} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  threads: getVisibleThreads(state),
  threadCounts: getThreadCounts(state),
  threadsFilter: state.settings.threadsFilter
});

export default connect(mapStateToProps)(ThreadsSection);
