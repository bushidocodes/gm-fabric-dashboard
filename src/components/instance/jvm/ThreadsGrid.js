import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import ThreadsSection from "./ThreadsSection";

/**
 * Very redundant feeling wrapper container that contains a ThreadsSection
 * TODO: Refactor to combide seciond and grid and break out threads control likt RoutesTableToolbar
 * @class ThreadsGrid
 * @extends {Component}
 */
class ThreadsGrid extends Component {
  static propTypes = {
    threadsTable: PropTypes.array
  };

  componentDidMount() {
    // Refresh Threads on every mount
    Actions.fetchThreads();
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

function mapStateToProps({ metrics: { threadsTable } }) {
  return { threadsTable };
}

export default connect(mapStateToProps)(ThreadsGrid);
