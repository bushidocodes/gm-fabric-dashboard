import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadsSection from "./components/ThreadsSection";
import ErrorBoundary from "components/library/ErrorBoundary";

/**
 * Very redundant feeling wrapper container that contains a ThreadsSection
 * TODO: Refactor to combine section and grid and break out threads control like RoutesTableToolbar
 * @class ThreadsGrid
 * @extends {Component}
 */
class ThreadsGrid extends Component {
  static propTypes = {
    fabricServer: PropTypes.string,
    selectedInstance: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string,
    threadsEndpoint: PropTypes.string,
    threadsTable: PropTypes.array
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
      Actions.fetchThreads(
        `${fabricServer}/threads/${selectedService}/${selectedServiceVersion}/${selectedInstance}`
      );
    } else {
      Actions.fetchThreads(threadsEndpoint);
    }
  }

  render() {
    const { threadsTable } = this.props;
    return (
      <div className="thread-table-container">
        <ErrorBoundary>
          <ThreadsSection threadsTable={threadsTable} />
        </ErrorBoundary>
      </div>
    );
  }
}

function mapStateToProps({
  metrics: { threadsTable },
  settings: {
    fabricServer,
    selectedService,
    selectedServiceVersion,
    selectedInstance,
    threadsEndpoint
  }
}) {
  return {
    fabricServer,
    selectedService,
    selectedServiceVersion,
    selectedInstance,
    threadsEndpoint,
    threadsTable
  };
}

export default connect(mapStateToProps)(ThreadsGrid);
