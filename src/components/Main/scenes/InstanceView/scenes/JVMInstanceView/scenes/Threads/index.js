import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadsTable from "./components/ThreadsTable";
import ThreadsTableToolbar from "./components/ThreadsTableToolbar";

import ErrorBoundary from "components/ErrorBoundary";
import { threadsTableItemShape } from "components/PropTypes";

// Importing external deps from src as WebPack Modules directory
import {
  getVisibleThreads,
  getThreadCounts,
  threadCountsShape
} from "utils/jvm/selectors";

/**
 * Parent container of ThreadsTable and ThreadsTableToolbar
 * @class ThreadsGrid
 * @extends {Component}
 */
class ThreadsGrid extends Component {
  static propTypes = {
    fabricServer: PropTypes.string,
    selectedInstance: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string,
    threadCounts: threadCountsShape.isRequired,
    threads: PropTypes.array,
    threadsEndpoint: PropTypes.string,
    threadsFilter: PropTypes.string,
    threadsTable: PropTypes.arrayOf(threadsTableItemShape)
  };

  componentDidMount() {
    const {
      fabricServer,
      selectedService,
      selectedServiceVersion,
      selectedInstance,
      threadsEndpoint
    } = this.props;

    // If fabricServer is truthy, we are running with a "Fabric Server" discovery service,
    // so we need to dynamically build the endpoint for the threads API. If falsy, we can just
    // pull the static configuration value from Redux via threadsEndpoint.
    // Technically Actions.fetchThreads defaults to the static threadsEndpoint, so this is
    // redundant, but we are showing it here just to be more explicit about the logic.

    if (this.props.fabricServer) {
      Actions.fetchAndStoreInstanceThreads(
        `${fabricServer}/threads/${selectedService}/${selectedServiceVersion}/${
          selectedInstance
        }`
      );
    } else {
      Actions.fetchAndStoreInstanceThreads(threadsEndpoint);
    }
  }

  render() {
    const { threadCounts, threadsFilter, threads } = this.props;
    return (
      <ErrorBoundary>
        <ThreadsTableToolbar
          threadCounts={threadCounts}
          threadsFilter={threadsFilter}
        />
        <ThreadsTable filteredThreadData={threads} />
      </ErrorBoundary>
    );
  }
}

function mapStateToProps(state) {
  return {
    fabricServer: state.settings.fabricServer,
    threads: getVisibleThreads(state),
    threadCounts: getThreadCounts(state),
    threadsFilter: state.settings.threadsFilter,
    threadsEndpoint: state.settings.threadsEndpoint,
    threadsTable: state.threadsTable,
    selectedService: state.fabric.selectedService,
    selectedServiceVersion: state.fabric.selectedServiceVersion,
    selectedInstance: state.fabric.selectedInstance
  };
}

export default connect(mapStateToProps)(ThreadsGrid);
