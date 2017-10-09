import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadsSection from "./ThreadsSection";

/**
 * Very redundant feeling wrapper container that contains a ThreadsSection
 * TODO: Refactor to combine section and grid and break out threads control like RoutesTableToolbar
 * @class ThreadsGrid
 * @extends {Component}
 */
class ThreadsGrid extends Component {
  static propTypes = {
    threadsEndpoint: PropTypes.string,
    threadsTable: PropTypes.array
  };

  componentDidMount() {
    // Refresh Threads on every mount
    if (this.props.threadsEndpoint) {
      Actions.fetchThreads(this.props.threadsEndpoint);
    } else {
      Actions.fetchThreads();
    }
  }

  render() {
    const { threadsTable } = this.props;
    return (
      <div className="thread-table-container">
        <ThreadsSection threadsTable={threadsTable} />
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
    selectedInstance
  }
}) {
  return {
    threadsTable,
    threadsEndpoint:
      fabricServer &&
      selectedService &&
      selectedServiceVersion &&
      selectedInstance
        ? `${fabricServer}/threads/${selectedService}/${selectedServiceVersion}/${selectedInstance}`
        : null
  };
}

export default connect(mapStateToProps)(ThreadsGrid);
